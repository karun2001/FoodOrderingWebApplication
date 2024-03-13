export default function Input({id, label, type, text, ...props}){
    return(
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} name={id} required {...props} />
        </p>
    )
}