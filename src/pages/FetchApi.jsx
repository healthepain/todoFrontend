import { useEffect, useState } from 'react'

function FetchApi() {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const controller = new AbortController()


        const fetchData = async () => {

            setLoading(true)

            await new Promise((res) => setTimeout(res, 1000))

            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users")
                const data = await res.json()
                setUser(data)
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }


        }
        fetchData()
        return () => {
            controller.abort()
        }
    }, [])

    return (
        <div>
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                    user.map((user, index) => (
                        <p key={index}>
                            {user.name} - {user.email}
                        </p>
                    ))
                )
            }
        </div>
    )
}

export default FetchApi
