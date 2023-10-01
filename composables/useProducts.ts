interface ProductData {
    title: string,
    price:number,
    description: string,
    image: string,
    category: string
}

export default function () {
     return {
        create(form: ProductData) {
            return useFetch<ProductData>("https://fakestoreapi.com/products", {
                method: "POST",
                body: form,
            })
                ;
        },
        getAll() {
            return useFetch<ProductData>("https://fakestoreapi.com/products", {
                method: "GET",
             })
                ;
        },
        update(id: number, form: ProductData) {
            return useFetch<any>(`https://fakestoreapi.com/products/${id}`, {
                method: "PUT",
                body: form,
            });
        },
         delete (id: number) {
            return useFetch(`https://fakestoreapi.com/products/${id}`, {
                method:"DELETE"
             });
        },
    };
}
