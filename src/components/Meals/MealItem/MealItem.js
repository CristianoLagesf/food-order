import { useContext } from 'react'
import CartContext from '../../../store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MeailItem = props => {
    const cartCtx = useContext(CartContext)

    const price = `$${props.price.toFixed(2)}`

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price

        })
    }
    return (
        <>
            <li className={classes.meal}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <id className={classes.price}>{price}</id>
                </div>
                <div>
                    <MealItemForm onAddToCart={addToCartHandler} />
                </div>
            </li>
        </>
    )
}

export default MeailItem