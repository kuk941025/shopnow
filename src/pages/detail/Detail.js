import React from 'react'
import { withRouter } from "react-router-dom";
import qs from "query-string";

const Detail = ({ location }) => {
    let { product_id } = qs.parse(location.search);
    return (
        <div>
            Product id = {product_id}
        </div>
    )
}

export default withRouter(Detail);