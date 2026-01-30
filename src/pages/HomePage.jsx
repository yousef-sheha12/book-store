import axios from "axios";
import BookCard from "../components/BookCard";
import { useState } from "react";
import { useEffect } from "react";

export default function HomePage() {
    // 1. pending
    // 2. success (optional)
    // 3. error (optional)
    // POST PUT DELETE GET

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(5);

    const getCategories = async () => {
        // await axios.get("https://dummyjson.com/products").then((res) => {
        //     console.log('success')
        //     console.log(res)
        // }).catch((err) => {
        //     console.log('error')
        //     console.log(err)
        // })

        try {
            const res = await axios.get("http://localhost:1337/api/categories");
            console.log(res.data.data)
            setCategories(res.data.data)
        } catch (error) {
            console.log('error')
            console.log(error)
        }
    }

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:1337/api/products", {
                params: {
                    // populate: "*",
                    populate: {
                        category: true,
                        pro_image: true
                    },
                    // pagination: {
                    //     page: `${page}`,
                    //     pageSize: `${pageSize}`
                    // },
                    filters: selectedCategories.length > 0 ? {
                        category: {
                            cat_name: {
                                $in: selectedCategories
                            }
                        }
                    } : {},
                    // fields: ["pro_name"]
                }
            });
            console.log(res.data)
            setProducts(res.data.data)
        } catch (error) {
            console.log('error')
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        getProducts();
    }, [selectedCategories])

    const handleSelectedCategories = (categoryName) => {
        setSelectedCategories(current => {
            if (current.includes(categoryName)) {
                return current.filter(cat => cat !== categoryName)
            }
            return [...current, categoryName]
        })
    }

    return (
        <>
            <div className="flex justify-center gap-5 px-10 pt-10">
                {
                    categories.map((cat) => {
                        return (
                            <label key={cat.id} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        handleSelectedCategories(cat.cat_name)
                                    }}
                                />
                                {cat.cat_name}
                            </label>
                        )
                    })
                }
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-10">
                {
                    products.map((product) => {
                        return (
                            <BookCard key={product.documentId} product={product} />
                        )
                    })
                }

                {/* <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard /> */}
            </div>

            {/* <div className="flex justify-center items-center gap-3">
                <button className="join-item btn" onClick={() => {
                    setPage(1);
                    console.log(1);
                }}>1</button>
                <button className="join-item btn" onClick={() => {
                    setPage(2);
                    console.log(2);
                }}>2</button>
            </div> */}
        </>
    )
}