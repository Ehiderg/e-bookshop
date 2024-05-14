const {
    createOrder,
    readOrders,
    readOrderById,
    updateOrder,
    removeOrder
} = require('../actions/orderAction');
const { readBookByID, removeBook } = require('../actions/bookAction');

async function getOrderById(req, res) {
    try {
        const active = req.query.active;
        const order = await readOrderById(req.params.id, !active);
        const sellerID = order.seller;
        const buyerID = order.buyer;
        console.log(sellerID);
        console.log(buyerID);
        console.log(req.headers.userId);
        if (sellerID === req.headers.userId || buyerID === req.headers.userId) {
            return res.status(200).json(order);
        } else {
            return res.status(403).json({ message: 'No tienes permiso para ver esta orden' });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getOrders(req, res) {
    try {
        const queryParams = req.query;
        const active = req.query.active;
        const orders = await readOrders(queryParams, !active);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function postOrder(req, res) {
    try {
        const buyerID = req.headers.userId;
        const bookIDs = req.body.books;

        const bookDetailsPromises = bookIDs.map(async (bookId) => {
            const book = await readBookByID(bookId);
            return { _id: book._id, seller: book.seller, price: book.price };
        });

        const bookDetails = await Promise.all(bookDetailsPromises);


        const total = bookDetails.reduce((acc, book) => acc + book.price, 0);


        const isSeller = bookDetails.some(book => buyerID === book.seller);
        if (isSeller) {
            return res.status(403).json({ message: 'No puedes comprar tus propios libros' });
        }

        const isAvailable = bookDetails.every(book => book.active !== false);
        if (!isAvailable) {
            return res.status(404).json({ message: 'Uno o más libros no están disponibles' });
        }

        const newOrder = await createOrder({ books: bookIDs, seller: bookDetails[0].seller, buyer: buyerID, total: total }, buyerID);
        console.log(newOrder);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


async function patchOrder(req, res) {
    try {
        let updatedOrder = {};
        const orderId = req.params.id;

        const order = await readOrderById(orderId);

        if (order.buyer === req.headers.userId) {
            if (!order.active) {
                return res.status(400).json({ message: 'El pedido no está activo' });
            }

            const newStatus = req.body.status;


            if (newStatus.toLowerCase() !== 'completado') {
                return res.status(400).json({ message: 'Estado de pedido no válido' });
            }


            order.status = newStatus;

            updatedOrder = await updateOrder(orderId, order);
            const bookDeletes = order.books.map(async (bookId) => {
                const book = await removeBook(bookId);
                return bookDeletes;
            });

        } else {
            if (order.seller === req.headers.userId) {
                if (!order.active) {
                    return res.status(400).json({ message: 'El pedido no está activo' });
                }


                const newStatus = req.body.status;


                if (newStatus.toLowerCase() !== 'cancelado') {
                    return res.status(400).json({ message: 'Estado de pedido no válido' });
                }

                order.status = newStatus;

                updatedOrder = await updateOrder(orderId, order);
            } else {
                {
                    return res.status(403).json({ message: 'No tienes permiso para actualizar esta orden' });
                }
            }
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function deleteOrder(req, res) {
    try {
        const order = await readOrderById(req.params.id);
        const buyerID = order.buyer;
        const sellerID = order.seller;

        if (buyerID === req.headers.userId || sellerID === req.headers.userId) {
            const deletedOrder = await removeOrder(req.params.id);
            res.status(200).json(deletedOrder);
        } else {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta orden' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getOrderById,
    getOrders,
    postOrder,
    patchOrder,
    deleteOrder
};
