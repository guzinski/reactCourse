import React, { Component } from "react";
import { LInk, Link } from "react-router-dom";
import api from "../../services/api";

import "./style.css";

export default class Main extends Component {

    state = {
        products: [],
        productInfo: [],
        page: 1,
        disablePrevButton: true,
        disableNextButton: true,
    }

    componentDidMount() {
        this.loadProducts(this.state.page);
    }

    loadProducts = async (page) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo, page });
    }

    disablePrevButton = () => {
        const { page } = this.state;
        return page === 1;
    }

    disableNextButton = () => {
        const { page, productInfo } = this.state;
        return page === productInfo.pages;
    }

    nextPage = async () => {
        this.loadProducts(this.state.page+1);
    }

    prevPage = async () => {
        this.loadProducts(this.state.page-1);
    }

    render() {
        const { products } = this.state;
        return <div className="product-list">
            {products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>
                    <Link to={`/product/${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={this.disablePrevButton()} onClick={this.prevPage} >Prev</button>
                <button disabled={this.disableNextButton()} onClick={this.nextPage} >Next</button>
            </div>
        </div>;
    }
} 