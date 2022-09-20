import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import CheckOut from './CheckOut'

const Cart = props => {
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })

    }
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)

    }
    const orderHandler = () => {
        setIsCheckOut(true)
    }
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://food-order-2047f-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems =
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) =>
            (<CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />)
            )}

        </ul>

    const modalAction = (
        <div className={classes.actions}>
            <button
                className={classes['button--alt']}
                onClick={props.onClose}
            >
                Close
            </button>
            {hasItems && (
                <button
                    className={classes.button}
                    onClick={orderHandler}
                >
                    Order
                </button>)}
        </div>)
    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckOut && modalAction}
        </>

    )
    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = (
        <>
            <p>Successfully sent the order</p>
            <div className={classes.actions}>
                <button
                    className={classes['button--alt']}
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </>)

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>)
}
export default Cart