// This is your test secret API key.
const stripe = require('stripe')('sk_test_51OrwZd2MYeojk7WwFskOWCv2QFOgWZ5tTStlPZmf24lggRq1h8plbkaXzmSBTTftr1sIEbUtoJJXfqzTRzOw8Hgo00pL6BOB8K');
const path = require("path");
const express = require('express');
const app = express();
const fs = require('fs');

// app.use(express.static('public'));
const cors = require("cors")
app.use(express.json());
app.use(cors());

const YOUR_DOMAIN = 'https://stripe-reactapp-6f7eb0d918b3.herokuapp.com';



//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));



   //api to load pdf
app.get('/api/pdf/:foldername/:filename', (req, res) => {
  const filename = req.params.filename;
  const foldername = req.params.foldername;
  
  const filePath = path.join(__dirname,'PDF',foldername,filename); // Assuming PDF files are stored in the 'pdfs' directory
  console.log("here i am server filename is",filename,foldername)
  try{
      res.send(filePath);
  }
  catch(error)
  {
    res.status(500).send({
      message:"successfully",
      data});
  }

});

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname='client/build/index.html'));
  })
}


//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

 
  




app.post('/create-checkout-session', async (req, res) => {
  const PRICE = req.body.price;
  const TAGET=req.body.target;
  console.log(TAGET);
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: PRICE,
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/${TAGET}`,
  });

  res.send({clientSecret: session.client_secret});
});

app.get('/test',async (req,res) => {
  res.send("Working");
})

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});





const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log('Express server is running on port 4242');
});
