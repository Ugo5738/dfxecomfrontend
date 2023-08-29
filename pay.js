// // this is for paystack payment: 

//  <script>
//       function payWithPaystack() {
//           let customer_id = "{{ request.user.id }}";
//           let customer_email = "{{ request.user.email }}";
//           let customer_phone_number = "{{ request.user.phone }}";
//           let customer_first_name = "{{ request.user.first_name }}"; 
//           let customer_last_name = "{{ request.user.last_name }}";
  
//           let order_total = "{{ order.get_total }}";
//           let order_id = "{{ order.id }}";

//           let multiplied_order_total = parseFloat(order_total) * 100;
//           let multiplied_order_total_string = multiplied_order_total.toString();
          
//           let public_key = '{{ PAYSTACK_PUBLIC_KEY }}';
          
//           function generateTxRef() {
//               let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//               let result = "";
//               for (let i = 0; i < 15; i++) {
//                   result += characters.charAt(Math.floor(Math.random() * characters.length));
//               }
//               return "dfx-" + Date.now() + result;
//           }
  
//           let tx_ref = generateTxRef();
          
//           let plan = "";
          
//           let obj = {
//               key: public_key,
//               amount: "100", // multiplied_order_total_string,
//               currency: "NGN",
//               ref: tx_ref,
//               email: customer_email,

//               metadata: {
//                   "order_id": order_id,
//                   "id": customer_id,
//                   "first_name": customer_first_name,
//                   "last_name": customer_last_name,
//                   "email": customer_email,
//                   "phone": customer_phone_number,
//               },

//               order_id: order_id,

//               callback: function(response) {
//                   let ref = response.reference;
//                   $.ajax({
//                       // url: "http://www.dfxgadgetshub.com/verify/?ref=" + ref,
//                       // url: "http://localhost:8000/verify/?ref=" + ref, // CHANGE THIS TO THE PRODUCTION BASE URL   
//                       url: "{% url 'dfx:verify_payment' %}?ref=" + ref,                   
//                       method: 'GET',
//                       success: function (response) {
//                           console.log("Payment verification successful!");
//                           console.log(response);
//                           // Redirect to the home page
//                           window.location.href = "{% url 'dfx:home' %}";
//                       },
//                       error: function (xhr, status, error) {
//                         console.log("Payment verification failed!");
//                         console.log(xhr.responseText);
//                       }
//                   });
//               },
//           }
          
//           if (Boolean(plan)) {
//               obj.plan = plan;
//           }
  
//           let handler = PaystackPop.setup(obj);
//           handler.openIframe();
//       }
//   </script>
  
// async function payWithPaystack() {
//     // Fetch the payment details from your API
//     const response = await fetch('http://localhost:8000/api/initiate-payment/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             // Include your authentication headers
//         },
//     });
//     const data = await response.json();

//     // Use the data in your Paystack function
//     let tx_ref = data.tx_ref;
//     let order_id = data.order_id;
//     let order_total = data.total;
//     let multiplied_order_total = parseFloat(order_total) * 100;

//     let obj = {
//         key: 'your-public-key',
//         email: 'customer-email',
//         amount: multiplied_order_total.toString(),
//         ref: tx_ref,
//         // Additional fields...
//         callback: function(response) {
//             // Verify payment
//         },
//     };
    
//     let handler = PaystackPop.setup(obj);
//     handler.openIframe();
// }