const Order = require('../models/Order');
const { readBookByID } = require('./bookAction');

async function readOrderById(orderID, active=true) {
  try {
    const order = await Order.findOne({ _id: orderID, active: active });
    if (!order) {
      throw new Error('No existe la orden');
    }
    return order;
    }
    catch (error) {
      throw new Error('Error al buscar la orden por ID');
    }
}

async function readOrders(queryParams, active=true) {
  try {
    const orders = await Order.find({ ...queryParams, active: active });
    if (!orders) {
      throw new Error('No se encontraron ordenes');
    }
    return orders;
  } catch (error) {
    throw new Error('Error al buscar ordenes');
  }
}

async function createOrder(orderData, userID) {
    try {
        const newOrder = await Order.create(orderData);
        return newOrder;
    } catch (error) {
        throw new Error('Error al crear la orden');
  }
  
}

async function updateOrder(orderID, orderData) {
  try {
    console.log(orderID);
    console.log(orderData);
    const updatedOrder = await Order.findByIdAndUpdate(orderID, orderData, { new: true });
    console.log(updatedOrder);
    if (!updatedOrder || !updatedOrder.active) {
        throw new Error('No se pudo actualizar la orden');
        }
        return updatedOrder;
    }
    catch (error) {
        throw new Error('Error al actualizar la orden');
    }
}

async function removeOrder(orderID) {
  try {
    const deletedOrder =
        await Order.findByIdAndUpdate(orderID, { active: false }, { new: true });
    if (!deletedOrder) {
        throw new Error('No se pudo eliminar la orden');
    }
    return deletedOrder;
  } catch (error) {
    throw new Error('Error al eliminar la orden');
  }
}

module.exports = {
  readOrderById,
  readOrders,
  createOrder,
  updateOrder,
  removeOrder
};
