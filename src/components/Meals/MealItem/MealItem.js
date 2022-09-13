import classes from './MealItem.module.css'

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

                </div>
            </li>
        </>
    )
}

export default MeailItem