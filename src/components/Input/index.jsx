export const Input = ({ name, label, type, placeholder, error, ...props }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-bold text-grey-500 mb-2" htmlFor={name}>{label}</label>
            <input className={`p-3 border border-grey-700 rounded-xl focus:outline focus:outline-1 focus:outline-grey-700 ${error && 'border-red-300'}`} id={name} name={name} type={type} placeholder={placeholder} {...props} />
            <span className="p-2 text-sm text-red-300">{error}</span>
        </div>
    )
}