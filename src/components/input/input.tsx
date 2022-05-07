export default function InputComponent() {
    const handleChange = () => {
        console.log('---handleChange---');
    };

    return (
        <input onChange={handleChange} />
    );
}