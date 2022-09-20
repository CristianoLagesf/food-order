import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MeailItem from './MealItem/MealItem';



const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://food-order-2047f-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();
            console.log(responseData);

            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadedMeals);
        }
        fetchMeals();
    }, []);
    const mealsList = meals.map(meals => {
        return <MeailItem
            id={meals.id}
            key={meals.id}
            name={meals.name}
            description={meals.description}
            price={meals.price}
        />
    })
    return <section className={classes.meals}>
        <Card>
            <ul>{mealsList}</ul>
        </Card>
    </section>
}

export default AvailableMeals