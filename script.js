var app = angular.module('myApp', []);
app.controller('cartCtrl', function($scope,$q,$http) {
   $scope.showData = function (data,title=''){
      console.log(`======Show Data of ${title}======`);
      console.log(data);
      //console.log(JSON.stringify(data,null,2));
   }
  
  $scope.addToCart = function(p){
    let isValid = true;
    let pr = {};
    let price = p.price;
    if(p.product_options.length>0){
      pr.options = [];
      p.product_options.forEach(x=>{
        if(p.hasOwnProperty('options')){
           if( !p.options.hasOwnProperty( x.name)){
             isValid = false;
           }else{
             const opt = JSON.parse( p.options[x.name] );
             const po = {
               poId :x.product_option_id,
               povId :opt.product_option_value_id,
               poName: x.name,
               poValuName: opt.name
             }
             pr.options.push(po);
             if(opt.price){
               price += opt.price;
             }
             
           }
        }else{
          isValid = false;
        }
      });
      
    }
    
      if(isNaN(p.qty) || p.qty <=0  ){
        isValid = false;
      }
    
      if(!isValid){
        alert("Please select all options");
        return;
      }
    
      pr.id = p.product_id;
      pr.qty = +p.qty;
      pr.price =  price;
      pr.name = p.name;
      pr.subtotal = pr.qty*pr.price;
      pr.rowid = new Date().getTime();
    
      let allOptionSame = false;
      let proIndex = -1;
      for(let i = 0 ; i<$scope.cart.products.length;i++ ){
        x = $scope.cart.products[i];
         proIndex = i;
        if(x.id == pr.id){
           if(pr.hasOwnProperty('options')){
             allOptionSame = JSON.stringify(pr.options) === JSON.stringify(x.options);
             
             if(!allOptionSame){
               break;
             }
             
            
           }
        }
        
      }
     
    
      if(!allOptionSame){
        $scope.cart.products.push(pr);
      }else{
         $scope.cart.products[proIndex].qty = pr.qty;
         $scope.cart.products[proIndex].subtotal = pr.subtotal;
      }
    
        let total =0;
        let  totalItem = 0;
        $scope.cart.products.forEach((x,index)=>{
          total += x.subtotal;
          totalItem += x.qty;
        });
        $scope.cart.total =total;
        $scope.cart.totalItem =  totalItem;
  }
  
  
   $scope.cart =  {
     products : [],
     totalItem: 0,
     total:0
   }
  
   $scope.products = [
        {
             product_id : 13,
             price:200,
              name : "Polo Casual Shirts",
             product_options: [
                  {
                      product_option_id: 14,
                      name: "Color",
                      product_option_value: [
                          {
                              product_option_value_id: 24,
                              price: false,
                              name: "red",
                          }
                      ]

                  }

             ]
        },
        {
             product_id : 11,
             price:500,
             name : "Frost Blue Mandarin Collar Printed Shirt",
             product_options: [
                  {
                      product_option_id: 15,
                      name: "Color",
                      product_option_value: [
                          {
                              product_option_value_id: 25,
                              price: 10,
                              name: "blue",

                          },
                          {
                              product_option_value_id: 27,
                              price: 20,
                              name: "green",
                          }
                      ]

                  },
                  {
                      product_option_id: 17,
                      name: "Size",
                      product_option_value: [
                          {
                              product_option_value_id: 29,
                              price: 10,
                              name: "XL"
                          },
                          {
                              product_option_value_id: 28,
                              name : "L",
                              price: false
                          }
                      ]

                  }
             ]
        }
   ];


    function asyncGreet() {
  
		  return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: 'https://jsonplaceholder.typicode.com/todos/1'
			}).then(function successCallback(response) {
                resolve(response);
			}, function errorCallback(response) {
			   reject(response);
			});
		    
		  });
    }

    $scope.fetchData = async function(){

    	const {data:posts} = await $http({
				method: 'GET',
				url: 'https://jsonplaceholder.typicode.com/posts'
			})
    	console.log(posts);

    	const {data:comments} = await $http({
				method: 'GET',
				url: 'https://jsonplaceholder.typicode.com/comments'
			})
    	console.log(comments);

	    // const data =  await asyncGreet();
	    // console.log(data);

	    // .then(res=>{
	    // 	console.log(res);
	    // }).catch(error=>{
	    // 	console.log(error);
	    // })
   }
  
   
  
  
});

// let cart  = {
//    products : [
//      {
//         id : 13,
//         rowid: 1,
//         qty : 1,
//        price:200,
//        name : "Polo Casual Shirts",
//        options: [
//           {  poId :14, povId : 24,poName:"Color",poValuName:"red"},
//        ],
//        subtotal:200
//      },
//       {
//         id : 11,
//         rowid:2,
//         qty : 2,
//         price:300,
//         name : "Frost Blue Mandarin Collar Printed Shirt",
//         options: [
//           {  poId :15, povId : 25,poName:"Color",poValuName:"blue"},
//           {  poId :17, povId : 29,poname:"Size",poValuName:"XL"}
//         ],
//         subtotal:600
//      },
//      {
//         id : 11,
//         rowid:2,
//         qty : 2,
//         price:300,
//         name : "Frost Blue Mandarin Collar Printed Shirt",
//         options: [
//           {  poId :15, povId : 27,poName:"Color",poValuName:"Green"},
//           {  poId :17, povId : 29,poname:"Size",poValuName:"XL"}
//         ],
//         subtotal:600
//      }
//    ],
//      totalItem: 3,
//      total:1400
// }


// const products = [
//   {
//        product_id : 13,
//        price:200,
//         name : "Polo Casual Shirts",
//        product_options: [
//             {
//                 product_option_id: 14,
//                 name: "Color",
//                 product_option_value: [
//                     {
//                         product_option_value_id: 24,
//                         price: false,
//                         name: "red",
//                     }
//                 ]
               
//             }
           
//        ]
//   },
//   {
//        product_id : 11,
//        price:500,
//        name : "Frost Blue Mandarin Collar Printed Shirt",
//        product_options: [
//             {
//                 product_option_id: 15,
//                 name: "Color",
//                 product_option_value: [
//                     {
//                         product_option_value_id: 25,
//                         price: 10,
//                         name: "blue",
                      
//                     },
//                     {
//                         product_option_value_id: 27,
//                         price: 20,
//                         name: "green",
//                     }
//                 ]
               
//             },
//             {
//                 product_option_id: 17,
//                 name: "Size",
//                 product_option_value: [
//                     {
//                         product_option_value_id: 29,
//                         price: 10,
//                         name: "XL"
//                     },
//                     {
//                         product_option_value_id: 28,
//                         name : "L",
//                         price: false
//                     }
//                 ]
               
//             }
//        ]
//   }
// ]