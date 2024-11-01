import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import Summary from './Summary';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import EmptyCartRelatedProducts from './EmptyCartRelatedProducts';

function ShoppingCart() {
    const [cart, setCart] = useState({ items: [] });
    const [productData, setProductData] = useState([]);
    const [newCart, setNewCart] = useState([]);
    const cartId = localStorage.getItem('cartId') || '';

    const API_BASE_URL = 'https://api.storefront.wdb.skooldio.dev';

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/carts/${cartId}`);
                if (!response.ok) throw new Error('Failed to fetch cart');
                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };
        fetchCart();
    }, [cartId]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!cart.items.length) return;

            try {
                const productPromises = cart.items.map(async (item) => {
                    const response = await fetch(
                        `${API_BASE_URL}/products/${item.productPermalink}`
                    );
                    if (!response.ok) throw new Error(`Failed to fetch product: ${item.productPermalink}`);
                    const productData = await response.json();
                    return { ...item, productDetails: productData };
                });

                const responses = await Promise.all(productPromises);
                setProductData(responses);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [cart.items]);

    useEffect(() => {
        const combinedCart = productData.map((product) => {
            const cartItem = cart.items.find(item => item.productPermalink === product.productPermalink);
            const colors = [...new Set(product.productDetails.variants.map(variant => variant.color))];
            const sizes = [...new Set(product.productDetails.variants.map(variant => variant.size))];
    
            return {
                id: cartItem?.id || null,
                skuCode: cartItem?.skuCode,
                name: product.productDetails.name,
                image: product.productDetails.imageUrls[0],
                colors: colors,
                sizes: sizes,
                price: product.productDetails.price,
                quantity: cartItem ? cartItem.quantity : 0,
                defaultColor: cartItem ? product.productDetails.variants.find(
                    variant => variant.skuCode === cartItem.skuCode
                )?.color : colors[0],
                defaultSize: cartItem ? product.productDetails.variants.find(
                    variant => variant.skuCode === cartItem.skuCode
                )?.size : sizes[0]
            };
        });
    
        setNewCart(combinedCart.filter(item => item.id !== null));
    }, [productData, cart.items]);

    const updateItem = async (itemId, quantity, color, size) => {
        const selectedProduct = productData.find(product => product.id === itemId);
        if (!selectedProduct) return;

        const skuCode = selectedProduct.productDetails.variants.find(
            variant => variant.color === color && variant.size === size
        )?.skuCode;

        if (!skuCode) {
            console.error("Error: SKU not found for the selected color and size.");
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/carts/${cartId}/items/${itemId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity, skuCode })
                }
            );

            if (!response.ok) throw new Error('Failed to update item');

            setNewCart(prevNewCart =>
                prevNewCart.map(item =>
                    item.id === itemId 
                        ? { ...item, quantity, defaultColor: color, defaultSize: size, skuCode }
                        : item
                )
            );
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/carts/${cartId}/items/${itemId}`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) throw new Error('Failed to delete item');
            
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.id !== itemId)
            }));
            setNewCart(prevNewCart => 
                prevNewCart.filter(item => item.id !== itemId)
            );
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="container mx-auto px-4 py-8">
                <p className="text-2xl font-bold mb-8">My Cart</p>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="shopItem bg-white p-6 rounded-lg shadow mb-6 lg:mb-0">
                        <div className="header text-xl font-bold mb-4">Items</div>
                        {newCart.length > 0 ? (
                            <div className="space-y-4">
                                {newCart.map((item) => (
                                    item && item.id ? (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            defaultColor={item.defaultColor}
                                            defaultSize={item.defaultSize}
                                            defaultQuantity={item.quantity}
                                            onDelete={() => handleDelete(item.id)}
                                            onUpdate={(quantity, color, size) => 
                                                updateItem(item.id, quantity, color, size)
                                            }
                                        />
                                    ) : null
                                ))}
                            </div>
                        ) : (
                            <EmptyCart />
                        )}
                    </div>
                    {newCart.length >= 0 && (
                        <div className="flex justify-center w-full lg:w-1/3">
                            <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
                                <Summary 
                                    cart={newCart} 
                                    totalItems={newCart.reduce((sum, item) => sum + item.quantity, 0)} 
                                />
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Show related products only when cart is empty */}
                {newCart.length === 0 && (
                    
                    <EmptyCartRelatedProducts />
                )}
            </div>
            <Footer/>
        </>
    );
}

export default ShoppingCart;
