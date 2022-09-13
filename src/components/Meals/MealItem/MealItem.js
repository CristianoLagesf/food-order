import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MeailItem = props => {
    const price = `$${props.price.toFixed(2)}`
    return (
        <>
            <li className={classes.meal}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <id className={classes.price}>{price}</id>
                </div>
                <div>
                    <MealItemForm />
                </div>
            </li>
        </>
    )
}

export default MeailItem