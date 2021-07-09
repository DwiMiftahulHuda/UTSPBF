import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "AC Polytron 1 PK Standar PAC-09 VG",
                "src": "https://cf.shopee.co.id/file/1dba733d57b1d1c584ce75bcd7cde20e",
                "description": "ID : 1",
                "content": "Kuat Dan Tahan Lama",
                "price": 50,
                "colors": ["white"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "AC Polytron Deluxe 2 1 PK PAC09PG2",
                "src": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-9361901/polytron_ac_polytron_deluxe_2_1_pk_pac09vg2_full01_bvlk26df.jpg",
                "description": "ID : 2",
                "content": "Pintu : Pintu Tunggal Kapasitas Kotor (Liter) : 170 liter, Handle Type : Ya, Ice Twist Tray : Ya, Botol Pocket : Super Big Bottle Pocket, Input Tegangan : 220V / 50Hz, Konsumsi Daya (Watt) : 75 Watt, Refrigeran : R 134a",
                "price": 35,
                "colors": ["White"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "AC Polytron 1 PK",
                "src": "https://media.pricebook.co.id/images/product/L/48932_L_1.jpg",
                "description": "ID : 3",
                "content": "Pintu : Pintu Tunggal Kapasitas Kotor (Liter) : 170 liter, Handle Type : Ya, Ice Twist Tray : Ya, Botol Pocket : Super Big Bottle Pocket, Input Tegangan : 220V / 50Hz, Konsumsi Daya (Watt) : 75 Watt, Refrigeran : R 134a",
                "price": 20,
                "colors": ["White"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "AC Polytron PAC 05LC",
                "src": "https://media.pricebook.co.id/images/product/L/48932_L_1.jpg",
                "description": "ID : 4",
                "content": "Pintu : Pintu Tunggal Kapasitas Kotor (Liter) : 170 liter, Handle Type : Ya, Ice Twist Tray : Ya, Botol Pocket : Super Big Bottle Pocket, Input Tegangan : 220V / 50Hz, Konsumsi Daya (Watt) : 75 Watt, Refrigeran : R 134a",
                "price": 15,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "AC Polytron PAC 05XV",
                "src": "https://s1.inkuiri.net/i/large/https%2Fimagerouter.tokopedia.com%2Fimg%2F700%2Fproduct-1%2F2016%2F7%2F19%2F475412%2F475412_ba6f3ea6-b176-4d17-9ac3-e624f5c3ef68.jpeg",
                "description": "ID : 5",
                "content": "Pintu : Pintu Tunggal Kapasitas Kotor (Liter) : 170 liter, Handle Type : Ya, Ice Twist Tray : Ya, Botol Pocket : Super Big Bottle Pocket, Input Tegangan : 220V / 50Hz, Konsumsi Daya (Watt) : 75 Watt, Refrigeran : R 134a",
                "price": 10,
                "colors": ["White"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "AC Polytron 2 PK PAC 18 XV",
                "src": "https://images.tokopedia.net/img/cache/500-square/product-1/2020/7/19/385203791/385203791_b1572506-2bc9-44f5-9b37-3ae1012b1c08_500_500.jpg?ect=4g",
                "description": "ID : 6",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 17,
                "colors": ["White"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


