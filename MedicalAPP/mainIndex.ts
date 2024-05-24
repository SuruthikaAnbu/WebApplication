let medId01:number=10;
let currentUser:UserDetails;
let currentUSerID:number;
let currentUserName:string;
let currentUSerBalance:number;
const tablebody=document.querySelector("#datatable tbody") as HTMLTableSectionElement;
const purchasetablebody=document.querySelector("#purchasedataTable tbody") as HTMLTableSectionElement;
const historytablebody=document.querySelector("#orderHistorytable tbody") as HTMLTableSectionElement;
const hisTabBody=document.querySelector("#orderHistorytable2 tbody") as HTMLTableSectionElement;
interface MedichineInfo
{
     medichineID:any;
     medichineName:string;
     medichineCount:number;
     medicinePrice:number;
     medicineExpiryDate:string;
  
}
//order history
let OID=2000;
interface OrderHistory
{
     orderID:any;
     medichineID:number;
     medichineName:string;
     medichineCount:number;
     medicinePrice:number;
     medicineExpiryDate:string;
     medicineStatus:string;

}


const renderTable = async () => {
  let md = document.getElementById('tablediv') as HTMLDivElement;
    md.style.display="block";
    let pr = document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
    pr.style.display="none";
    let co = document.getElementById('cancelOrder2') as HTMLDivElement;
    co.style.display="none";
    let tu = document.getElementById('topUpId') as HTMLDivElement;
    tu.style.display="none";
    let oh = document.getElementById('orderHistorytable') as HTMLDivElement;
    oh.style.display="none";
    let hm = document.getElementById('homepage') as HTMLDivElement;
    hm.style.display="none";
  
    const medichineList=await fetchMedicine();
    tablebody.innerHTML = "";
    medichineList.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.medichineID}</td>
        <td>${item.medichineName}</td>
        <td>${item.medichineCount}</td>
        <td>${item.medicinePrice}</td>
        <td>${item.medicineExpiryDate}</td>
        
        
        
        `;
      tablebody.appendChild(row);
    });
  };
//user details
let uID=100;
interface UserDetails
{
     userID:any;
     userName:string;
     password:string;
     walletBalance:number;
     phoneNumber:number;
    //  constructor(UName:string, UPW:string, WBalance:number,pNum:number)
    //  {
    //     this.userId="UID"+uID++;
    //     this.userName=UName;
    //     this.passWord=UPW;
    //     this.walletBalance=WBalance;
    //     this.PhoneNumber=pNum;
    //  }
}
// let userList:Array<UserDetails>=new Array<UserDetails>();
// userList.push(new UserDetails("suruthi","suruthi@123",500,9098765434));
// userList.push(new UserDetails("abi","abi@123",500,9098765434));
//visibility sign-up
function signUpFun()
{
  let signuppage = document.getElementById('signiUpPAge') as HTMLDivElement;
  signuppage.style.display = "block";
  let homePage = document.getElementById('existingUserPage') as HTMLDivElement;
  homePage.style.display = "none";
}
//visibility-signin
function signinShow(){
  let homePage = document.getElementById('existingUserPage') as HTMLDivElement;
  //let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;

  homePage.style.display = "block";
  let signuppage = document.getElementById('signiUpPAge') as HTMLDivElement;
  signuppage.style.display = "none";
 // newUserPage.style.display = "none";
}
//signIn
async function signIn()
{
  
    //alert(1);
    let noExUserID:boolean=false;
    let exuserId=Number((document.getElementById("existinguserID") as HTMLInputElement).value);
    //let exUserIdRedex =/^UID\d{3}$/;
    //if(exUserIdRedex.test(exuserId))
    const userList=await fetchUser();
    console.log(userList);
        for(let i=0;i<userList.length;i++)
        {
          //alert(2);
            if(userList[i].userID == exuserId)
            {
              //alert(3);
                currentUSerID=userList[i].userID;
                currentUser=userList[i];
                currentUserName=userList[i].userName;
                currentUSerBalance=userList[i].walletBalance;
                alert("LoginSuccessful");
                let homePage = document.getElementById('homediv') as HTMLDivElement;
                let mainPage = document.getElementById('mainmainID') as HTMLDivElement;
                homePage.style.visibility="visible";
                mainPage.style.display="none";
                return;
            }
            else{
                
                noExUserID=true;
            }
        }
}
//top-up----------
function topUpVisible(){
  let md = document.getElementById('tablediv') as HTMLDivElement;
  md.style.display="none";
  let pr = document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
  pr.style.display="none";
  let co = document.getElementById('cancelOrder2') as HTMLDivElement;
  co.style.display="none";
  let oh = document.getElementById('orderHistorytable') as HTMLDivElement;
  oh.style.display="none";
  let hm = document.getElementById('homepage') as HTMLDivElement;
  hm.style.display="nobr";
  let pur=document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
    pur.style.display="none";
  let tu = document.getElementById('topUpId') as HTMLDivElement;
  tu.style.display="block";
}
function topup()
{
 

    let amt=(document.getElementById("getAmount") as HTMLLIElement).value;
    let fin=+amt;
    currentUSerBalance+=fin;
    let tu = document.getElementById('topUpId') as HTMLDivElement;
    tu.style.display="none";
    // let cb:number=CurrentUSerBalance+amount;
    // CurrentUSerBalance=cb;
    alert(currentUSerBalance);
    // console.log(CurrentUSerBalance);

}
function showBalance()
{
  let md = document.getElementById('tablediv') as HTMLDivElement;
  md.style.display="none";
  let pr = document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
  pr.style.display="none";
  let co = document.getElementById('cancelOrder2') as HTMLDivElement;
  co.style.display="none";
  let tu = document.getElementById('topUpId') as HTMLDivElement;
  tu.style.display="none";
  let oh = document.getElementById('orderHistorytable') as HTMLDivElement;
  oh.style.display="none";
  let hm = document.getElementById('homepage') as HTMLDivElement;
  hm.style.display="none";
    alert("your current balance is"+currentUSerBalance);
}
function purchace()
{
    renderTable();
}
async function checkPurchase()
{
  let md = document.getElementById('tablediv') as HTMLDivElement;
    md.style.display="block";
    
    let pr = document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
    pr.style.display="block";
    let co = document.getElementById('cancelOrder2') as HTMLDivElement;
    co.style.display="none";
    let tu = document.getElementById('topUpId') as HTMLDivElement;
    tu.style.display="none";
    let oh = document.getElementById('orderHistorytable') as HTMLDivElement;
    oh.style.display="none";
    let hm = document.getElementById('homepage') as HTMLDivElement;
    hm.style.display="none";
    const medichineList=await fetchMedicine();
    const ShowTable = () => {
        tablebody.innerHTML = "";
        medichineList.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          
            <td>${item.medichineID}</td>
            <td>${item.medichineName}</td>
            <td>${item.medichineCount}</td>
            <td>${item.medicinePrice}</td>
            <td>${item.medicineExpiryDate}</td>
            <td><button onclick="fun(${item.medichineID})">buy</button></td>
            `
          tablebody.appendChild(row);
        });
    };
    ShowTable();
    
}
//purchase list------------------------------------------------------------------------------------
class purchaseMEd{

}
//----------------------------------------
//let data: TableData[] = [];
  let medichineID: Number | null = null;
const edit = (id: Number) => {
  medichineID = id;
  // const item = data.find((item) => item.id === id);
  // if (item) {
  //   nameInput.value = item.name;
  //   ageInput.value = String(item.age);
  // for(let i=0;i<medichineList.length;i++)
  // {
  //   if(medichineID==medichineList[i].medichineID)
  //   {
  //     alert("please im pavam");
  //   }
  // }

  }
//};
function home()
{
    // document.getElementById('homeName') as HTMLDivElement=CurrentUserName;
    //document.getElementById("#homeName").innerHTML=CurrentUserName;
    let md = document.getElementById('tablediv') as HTMLDivElement;
    md.style.display="none";
    let pr = document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
    pr.style.display="none";
    let co = document.getElementById('cancelOrder2') as HTMLDivElement;
    co.style.display="none";
    let tu = document.getElementById('topUpId') as HTMLDivElement;
    tu.style.display="none";
    let oh = document.getElementById('orderHistorytable') as HTMLDivElement;
    oh.style.display="none";
    let hm = document.getElementById('homepage') as HTMLDivElement;
    hm.style.display="block";
    let greet = document.getElementById('homeName') as HTMLLabelElement;
    greet.innerHTML = `<h3>Hello ${currentUserName}</h3>`;
}
async function fun(medId: number)
{

    //alert("very fun");
    let purchaseQuan=(document.getElementById("Quan") as HTMLInputElement).value;
    let purchaceQ=parseInt(purchaseQuan);
    // let mID=medId;
    // let mediID2=medId;       //(document.getElementById("medPurchase") as HTMLInputElement).value;
    // let mediId=mediID2;
    const medichineList=await fetchMedicine();
    for(let i=0;i<medichineList.length;i++)
    {
        if(medId==medichineList[i].medichineID)
        {
          console.log("Purchase logic executed for medicine:", medichineList[i].medichineName);

            alert("somethings match");
            //check quantity
            if(purchaceQ < medichineList[i].medichineCount)
            {
                alert("medicine count is available");
                if(currentUSerBalance>medichineList[i].medicinePrice)
                {
                    alert("you have enough balance");
                    medichineList[i].medichineCount-=purchaceQ;
                    updateMedicine(medichineList[i].medichineID,medichineList[i]);
                    currentUSerBalance-=(medichineList[i].medicinePrice*purchaceQ);
                    let medTotalAmt=medichineList[i].medicinePrice*purchaceQ;
                    updateUser(currentUSerID,currentUser);
                    //orderHistortList.push(new OrderHistory(mediId,medichineList[i].medichineName,purchaceQ,medTotalAmt,medichineList[i].medicineExpiryDate,"ordered"));
                    const travel1: OrderHistory = {
                       orderID:undefined,
                       medichineID:medId,
                      medichineName:medichineList[i].medichineName,
                       medichineCount:purchaceQ,
                      medicinePrice:medTotalAmt,
                      medicineExpiryDate:medichineList[i].medicineExpiryDate,
                      medicineStatus:"Ordered" 
                    };
                    addHistory(travel1);
                    updateMedicine(medichineList[i].medichineID,medichineList[i])
                    //OID--;
                    //LocalOrderHistoryList.push(new OrderHistory(mediId,medichineList[i].medichineName,purchaceQ,medTotalAmt,medichineList[i].medicineExpiryDate,"ordered"));
                    
                    alert("purchased successfully");
                    showOrderHistory();
                    break;
                
                }
            
            }
            
        }
    }
}

    const showOrderHistory = async () => {
        historytablebody.innerHTML = "";
        let pur=document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
        pur.style.display="none";
        let x=document.getElementById('orderHistorytable') as HTMLDivElement;
        x.style.display="block";
        const orderHistortList=await fetchOrder()
        orderHistortList.forEach((item) => {
           {
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td>${item.medichineID}</td>
                  <td>${item.medichineName}</td>
                  <td>${item.medichineCount}</td>
                  <td>${item.medicinePrice}</td>
                  <td>${item.medicineExpiryDate}</td>
                  <td>${item.medicineStatus}</td>
              `;
              historytablebody.appendChild(row);
          }
      });
        // for(let k=0;k<orderHistortList.length;k++)
        // {
        //   if(orderHistortList[k].medicineStatus=="Ordered" || orderHistortList[k].medicineStatus=="ordered")
        //   {
        //     orderHistortList.forEach((item) => {
    
        //       const row = document.createElement("tr");
        //       row.innerHTML = `
        //         <td>${item.medichineID}</td>
        //         <td>${item.medichineName}</td>
        //         <td>${item.medichineCount}</td>
        //         <td>${item.medicinePrice}</td>
        //         <td>${item.medicineExpiryDate}</td>
        //         <td>${item.medicineStatus}</td>
        //         `;
        //         historytablebody.appendChild(row);
              
        //     });
        //   }
        // }
        
        
      };


async function checkPurchaseDetails()
{
  let md = document.getElementById('tablediv') as HTMLDivElement;
  md.style.display="none";
  let pr = document.getElementById('purchaseMesdicineShow') as HTMLDivElement;
  pr.style.display="none";
  let co = document.getElementById('cancelOrder2') as HTMLDivElement;
  co.style.display="none";
  let tu = document.getElementById('topUpId') as HTMLDivElement;
  tu.style.display="none";
  let oh = document.getElementById('orderHistorytable') as HTMLDivElement;
  oh.style.display="none";
  let displaydetails=document.getElementById('tablediv') as HTMLDivElement;
  displaydetails.style.display="none";
  
  let details = document.getElementById('cancelOrder2') as HTMLDivElement;
  details.style.display="block";
      const orderHistortList=await fetchOrder()
      
      hisTabBody.innerHTML = "";
      orderHistortList.forEach((item) => {
        if (item.medicineStatus === "Ordered" || item.medicineStatus === "ordered")
        {
          const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.medichineID}</td>
          <td>${item.medichineName}</td>
          <td>${item.medichineCount}</td>
          <td>${item.medicinePrice}</td>
          <td>${item.medicineStatus}</td>
          <td><button onclick="remove1(${item.orderID})" >Remove</button></td>
          `;
          hisTabBody.appendChild(row);
        } 
      });
    };
        
        
    
 
const remove1=async (Cid:number)=>
{
  //const LocalOrderHistoryList=await fetchOrder();
  const medichineList=await fetchMedicine();
  const orderHistortList=await fetchOrder();
    // for(let i=0;i<LocalOrderHistoryList.length;i++)
    // {
      // if(LocalOrderHistoryList[i].orderID==Cid)
      // {
        
        for(let i=0;i<orderHistortList.length;i++)
        {
          if(orderHistortList[i].orderID===Cid && orderHistortList[i].medicineStatus=="Ordered")
          {
            orderHistortList[i].medicineStatus="Cancelled";
            // let medId=orderHistortList[j].medichineID;
            // currentUSerBalance+=orderHistortList[j].medicinePrice;
            // alert(currentUSerBalance);
            
            for(let j=0;j<medichineList.length;j++)
            {
              if(medichineList[j].medichineID==orderHistortList[i].medichineID)
              {
                alert("invaliddd")
                orderHistortList[i].medicineStatus="Cancelled";
                //updateOrderHistory(orderHistortList[i].orderID,orderHistortList[i])
                // const upd1:OrderHistory={
                //   orderID: orderHistortList[i].orderID,
                //   medichineID: orderHistortList[i].medichineID,
                //   medichineName: orderHistortList[i].medichineName,
                //   medichineCount: orderHistortList[i].medichineCount,
                //   medicinePrice: orderHistortList[i].medicinePrice,
                //   medicineExpiryDate: "2026-02-11",
                //   medicineStatus: "cancelled"
                // };
                // //fetchOrder();
                updateOrderHistory(orderHistortList[i].orderID,orderHistortList[i]);
                currentUSerBalance+=orderHistortList[i].medicinePrice;
                updateUser(currentUSerID,currentUser);
                medichineList[j].medichineCount+=orderHistortList[i].medichineCount;
                alert(Cid);
                //LocalOrderHistoryList=LocalOrderHistoryList.filter((item)=>item.orderID!==Cid);

                //deleteOrder(Cid)
                //checkPurchaseDetails();
                alert(currentUSerBalance);
                alert("done");
                break;
              }
            }
            break;

          }
        }
        
      
      }
    // }
    
// }
//signUP--------------------------------------------------sign up--------------------------------------------*****
function signUpShow() {
    let uname = (document.getElementById('signUPUname') as HTMLInputElement).value;
    let mail1 = (document.getElementById('signUpmailID') as HTMLInputElement).value;
    let pw1 = (document.getElementById('signUpPW') as HTMLInputElement).value;
    let pw2 = (document.getElementById('signUpConPW') as HTMLInputElement).value;
    let pn1 = (document.getElementById('signUppn') as HTMLInputElement).value;
    let SUBlance = (document.getElementById('signUpBalance') as HTMLInputElement).value;
    //userList.push(new UserDetails(uname,pw1,+SUBlance,+pn1));
    const user1: UserDetails = {
     

      userID:undefined,
      userName:uname,
      password:pw1,
      walletBalance:parseFloat(SUBlance),
      phoneNumber:parseInt(pn1)
     
   };
   addUser(user1);

}
//post
async function addUser(user:UserDetails):Promise<void> {
  const response=await fetch('http://localhost:5144/api/UserDetails',{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(user)
      });
      if(!response.ok){
          throw new Error('Failed to Add user');
      }
 
}
async function addMedicine(medicine:MedichineInfo):Promise<void> {
  const response=await fetch('http://localhost:5144/api/MedichineInfo',{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(medicine)
      });
      if(!response.ok){
          throw new Error('Failed to Add medicine');
      }
 
}
//add history
async function addHistory(order:OrderHistory):Promise<void> {
  const response=await fetch('http://localhost:5144/api/OrderHistory',{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(order)
      });
      if(!response.ok){
          throw new Error('Failed to Add history');
      }
 
}
//update user details
async function updateUser(id:number,user:UserDetails):Promise<void> {
  const response=await fetch(`http://localhost:5144/api/UserDetails/${id}`,{
      method:'PUT',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(user)
      });
      if(!response.ok){
          throw new Error('Failed to update user');
      }
      checkPurchase();
  }   
//update medicine info
async function updateMedicine(id:number,medicine:MedichineInfo):Promise<void> {
  const response=await fetch(`http://localhost:5144/api/MedichineInfo/${id}`,{
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(medicine)
          });
          if(!response.ok){
              throw new Error('Failed to update medicine');
      }
  }   
  //update orderhistory
async function updateOrderHistory(id:number,order:OrderHistory):Promise<void> {
  const response=await fetch(`http://localhost:5144/api/OrderHistory/${id}`,{
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(order)
          });
          if(!response.ok){
              throw new Error('Failed to update order');
      }
  }  
//recharge------------------need to change
async function updateRecharge(id:number,amount:number):Promise<void> {
  const response=await fetch(`http://localhost:5144/api/UserDetails/${id}/${amount}`,{
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(amount)
          });
          if(!response.ok){
              throw new Error('Failed to update Travel');
      }
  }   

//delete---order
async function deleteOrder(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5144/api/OrderHistory/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
 
}
//delete---medichine info
async function deleteMedichine(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5144/api/MedichineInfo/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete medicine');
  }
 
}
//fetch-user
async function fetchUser():Promise<UserDetails[]> {
  const apiURL='http://localhost:5144/api/UserDetails';
  const response=await fetch(apiURL);
      
      if(!response.ok){
          throw new Error('Failed to Add Contacts');
      }
      return await response.json();
}
//fetch-medicine
async function fetchMedicine():Promise<MedichineInfo[]> {
  const apiURL='http://localhost:5144/api/MedichineInfo';
  const response=await fetch(apiURL);
      
      if(!response.ok){
          throw new Error('Failed to Add medicine');
      }
      return await response.json();
}
//fetch-order history
async function fetchOrder():Promise<OrderHistory[]> {
  const apiURL='http://localhost:5144/api/OrderHistory';
  const response=await fetch(apiURL);
      
      if(!response.ok){
          throw new Error('Failed to Add history');
      }
      return await response.json();
}
