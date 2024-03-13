import MealItem from "./MealItem";

export default function Menu({meals}){
    return(
        <div >
            <ul id="meals">
                {meals.map((meal)=>{
                    return(
                        <MealItem meal={meal} key={meal.id} />
                    );
                })}
            </ul>  
        </div>
    )
}