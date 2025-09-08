import { useLocation, useParams } from "react-router-dom"

export default function ProductOverview () {

    const params = useParams()

    console.log(params)

    return (
        <div>
            product overview {params.id}

        </div>
    )
}