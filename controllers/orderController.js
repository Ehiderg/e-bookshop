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
        if (!order.active) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        return res.status(200).json(order);
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
        
        // Obtener el pedido por su ID
        const order = await readOrderById(orderId);
        
        // Verificar si el usuario que realiza la solicitud es el comprador del pedido
        if (order.buyer === req.headers.userId) {
            if (!order.active) {
                return res.status(400).json({ message: 'El pedido no está activo' });
            }
            
            // Obtener el nuevo estado del pedido desde el cuerpo de la solicitud
            const newStatus = req.body.status;
            
            // Verificar si el nuevo estado es válido
            if (newStatus.toLowerCase() !== 'completado') {
                return res.status(400).json({ message: 'Estado de pedido no válido' });
            }
            
            // Actualizar el estado del pedido
            order.status = newStatus;

            updatedOrder = await updateOrder(orderId, order);
            const bookDeletes = order.books.map(async (bookId) => {
                const book = await removeBook(bookId);
                return bookDeletes;
            });
        } else{
            if(order.seller === req.headers.userId){
                if (!order.active) {
                    return res.status(400).json({ message: 'El pedido no está activo' });
                }
                
                // Obtener el nuevo estado del pedido desde el cuerpo de la solicitud
                const newStatus = req.body.status;
                
                // Verificar si el nuevo estado es válido
                if (newStatus.toLowerCase() !== 'cancelado') {
                    return res.status(400).json({ message: 'Estado de pedido no válido' });
                }
                
                // Actualizar el estado del pedido
                order.status = newStatus;

                updatedOrder = await updateOrder(orderId, order);
            }else{{
                return res.status(403).json({ message: 'No tienes permiso para actualizar esta orden' });
            }}
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
        if (buyerID !== req.headers.userId) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta orden' });
        }
        const deletedOrder = await removeOrder(req.params.id);
        res.status(200).json(deletedOrder);
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
