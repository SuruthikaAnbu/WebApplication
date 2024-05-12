"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let medId01 = 10;
let currentUser;
let currentUSerID;
let currentUserName;
let currentUSerBalance;
const tablebody = document.querySelector("#datatable tbody");
const purchasetablebody = document.querySelector("#purchasedataTable tbody");
const historytablebody = document.querySelector("#orderHistorytable tbody");
const hisTabBody = document.querySelector("#orderHistorytable2 tbody");
//order history
let OID = 2000;
const renderTable = () => __awaiter(void 0, void 0, void 0, function* () {
    let md = document.getElementById('tablediv');
    md.style.display = "block";
    let pr = document.getElementById('purchaseMesdicineShow');
    pr.style.display = "none";
    let co = document.getElementById('cancelOrder2');
    co.style.display = "none";
    let tu = document.getElementById('topUpId');
    tu.style.display = "none";
    let oh = document.getElementById('orderHistorytable');
    oh.style.display = "none";
    let hm = document.getElementById('homepage');
    hm.style.display = "none";
    const medichineList = yield fetchMedicine();
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
});
//user details
let uID = 100;
// let userList:Array<UserDetails>=new Array<UserDetails>();
// userList.push(new UserDetails("suruthi","suruthi@123",500,9098765434));
// userList.push(new UserDetails("abi","abi@123",500,9098765434));
//visibility sign-up
function signUpFun() {
    let signuppage = document.getElementById('signiUpPAge');
    signuppage.style.display = "block";
    let homePage = document.getElementById('existingUserPage');
    homePage.style.display = "none";
}
//visibility-signin
function signinShow() {
    let homePage = document.getElementById('existingUserPage');
    //let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    homePage.style.display = "block";
    let signuppage = document.getElementById('signiUpPAge');
    signuppage.style.display = "none";
    // newUserPage.style.display = "none";
}
//signIn
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        //alert(1);
        let noExUserID = false;
        let exuserId = Number(document.getElementById("existinguserID").value);
        //let exUserIdRedex =/^UID\d{3}$/;
        //if(exUserIdRedex.test(exuserId))
        const userList = yield fetchUser();
        console.log(userList);
        for (let i = 0; i < userList.length; i++) {
            //alert(2);
            if (userList[i].userID == exuserId) {
                //alert(3);
                currentUSerID = userList[i].userID;
                currentUser = userList[i];
                currentUserName = userList[i].userName;
                currentUSerBalance = userList[i].walletBalance;
                alert("LoginSuccessful");
                let homePage = document.getElementById('homediv');
                let mainPage = document.getElementById('mainmainID');
                homePage.style.visibility = "visible";
                mainPage.style.display = "none";
                return;
            }
            else {
                noExUserID = true;
            }
        }
    });
}
//top-up----------
function topUpVisible() {
    let md = document.getElementById('tablediv');
    md.style.display = "none";
    let pr = document.getElementById('purchaseMesdicineShow');
    pr.style.display = "none";
    let co = document.getElementById('cancelOrder2');
    co.style.display = "none";
    let oh = document.getElementById('orderHistorytable');
    oh.style.display = "none";
    let hm = document.getElementById('homepage');
    hm.style.display = "nobr";
    let pur = document.getElementById('purchaseMesdicineShow');
    pur.style.display = "none";
    let tu = document.getElementById('topUpId');
    tu.style.display = "block";
}
function topup() {
    let amt = document.getElementById("getAmount").value;
    let fin = +amt;
    currentUSerBalance += fin;
    let tu = document.getElementById('topUpId');
    tu.style.display = "none";
    // let cb:number=CurrentUSerBalance+amount;
    // CurrentUSerBalance=cb;
    alert(currentUSerBalance);
    // console.log(CurrentUSerBalance);
}
function showBalance() {
    let md = document.getElementById('tablediv');
    md.style.display = "none";
    let pr = document.getElementById('purchaseMesdicineShow');
    pr.style.display = "none";
    let co = document.getElementById('cancelOrder2');
    co.style.display = "none";
    let tu = document.getElementById('topUpId');
    tu.style.display = "none";
    let oh = document.getElementById('orderHistorytable');
    oh.style.display = "none";
    let hm = document.getElementById('homepage');
    hm.style.display = "none";
    alert("your current balance is" + currentUSerBalance);
}
function purchace() {
    renderTable();
}
function checkPurchase() {
    return __awaiter(this, void 0, void 0, function* () {
        let md = document.getElementById('tablediv');
        md.style.display = "block";
        let pr = document.getElementById('purchaseMesdicineShow');
        pr.style.display = "block";
        let co = document.getElementById('cancelOrder2');
        co.style.display = "none";
        let tu = document.getElementById('topUpId');
        tu.style.display = "none";
        let oh = document.getElementById('orderHistorytable');
        oh.style.display = "none";
        let hm = document.getElementById('homepage');
        hm.style.display = "none";
        const medichineList = yield fetchMedicine();
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
            `;
                tablebody.appendChild(row);
            });
        };
        ShowTable();
    });
}
//purchase list------------------------------------------------------------------------------------
class purchaseMEd {
}
//----------------------------------------
//let data: TableData[] = [];
let medichineID = null;
const edit = (id) => {
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
};
//};
function home() {
    // document.getElementById('homeName') as HTMLDivElement=CurrentUserName;
    //document.getElementById("#homeName").innerHTML=CurrentUserName;
    let md = document.getElementById('tablediv');
    md.style.display = "none";
    let pr = document.getElementById('purchaseMesdicineShow');
    pr.style.display = "none";
    let co = document.getElementById('cancelOrder2');
    co.style.display = "none";
    let tu = document.getElementById('topUpId');
    tu.style.display = "none";
    let oh = document.getElementById('orderHistorytable');
    oh.style.display = "none";
    let hm = document.getElementById('homepage');
    hm.style.display = "block";
    let greet = document.getElementById('homeName');
    greet.innerHTML = `<h3>Hello ${currentUserName}</h3>`;
}
function fun(medId) {
    return __awaiter(this, void 0, void 0, function* () {
        //alert("very fun");
        let purchaseQuan = document.getElementById("Quan").value;
        let purchaceQ = parseInt(purchaseQuan);
        // let mID=medId;
        // let mediID2=medId;       //(document.getElementById("medPurchase") as HTMLInputElement).value;
        // let mediId=mediID2;
        const medichineList = yield fetchMedicine();
        for (let i = 0; i < medichineList.length; i++) {
            if (medId == medichineList[i].medichineID) {
                console.log("Purchase logic executed for medicine:", medichineList[i].medichineName);
                alert("somethings match");
                //check quantity
                if (purchaceQ < medichineList[i].medichineCount) {
                    alert("medicine count is available");
                    if (currentUSerBalance > medichineList[i].medicinePrice) {
                        alert("you have enough balance");
                        medichineList[i].medichineCount -= purchaceQ;
                        updateMedicine(medichineList[i].medichineID, medichineList[i]);
                        currentUSerBalance -= (medichineList[i].medicinePrice * purchaceQ);
                        let medTotalAmt = medichineList[i].medicinePrice * purchaceQ;
                        updateUser(currentUSerID, currentUser);
                        //orderHistortList.push(new OrderHistory(mediId,medichineList[i].medichineName,purchaceQ,medTotalAmt,medichineList[i].medicineExpiryDate,"ordered"));
                        const travel1 = {
                            orderID: undefined,
                            medichineID: medId,
                            medichineName: medichineList[i].medichineName,
                            medichineCount: purchaceQ,
                            medicinePrice: medTotalAmt,
                            medicineExpiryDate: medichineList[i].medicineExpiryDate,
                            medicineStatus: "Ordered"
                        };
                        addHistory(travel1);
                        updateMedicine(medichineList[i].medichineID, medichineList[i]);
                        //OID--;
                        //LocalOrderHistoryList.push(new OrderHistory(mediId,medichineList[i].medichineName,purchaceQ,medTotalAmt,medichineList[i].medicineExpiryDate,"ordered"));
                        alert("purchased successfully");
                        showOrderHistory();
                        break;
                    }
                }
            }
        }
    });
}
const showOrderHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    historytablebody.innerHTML = "";
    let pur = document.getElementById('purchaseMesdicineShow');
    pur.style.display = "none";
    let x = document.getElementById('orderHistorytable');
    x.style.display = "block";
    const orderHistortList = yield fetchOrder();
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
});
function checkPurchaseDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let md = document.getElementById('tablediv');
        md.style.display = "none";
        let pr = document.getElementById('purchaseMesdicineShow');
        pr.style.display = "none";
        let co = document.getElementById('cancelOrder2');
        co.style.display = "none";
        let tu = document.getElementById('topUpId');
        tu.style.display = "none";
        let oh = document.getElementById('orderHistorytable');
        oh.style.display = "none";
        let displaydetails = document.getElementById('tablediv');
        displaydetails.style.display = "none";
        let details = document.getElementById('cancelOrder2');
        details.style.display = "block";
        const orderHistortList = yield fetchOrder();
        hisTabBody.innerHTML = "";
        orderHistortList.forEach((item) => {
            if (item.medicineStatus === "Ordered" || item.medicineStatus === "ordered") {
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
    });
}
;
const remove1 = (Cid) => __awaiter(void 0, void 0, void 0, function* () {
    //const LocalOrderHistoryList=await fetchOrder();
    const medichineList = yield fetchMedicine();
    const orderHistortList = yield fetchOrder();
    // for(let i=0;i<LocalOrderHistoryList.length;i++)
    // {
    // if(LocalOrderHistoryList[i].orderID==Cid)
    // {
    for (let i = 0; i < orderHistortList.length; i++) {
        if (orderHistortList[i].orderID === Cid && orderHistortList[i].medicineStatus == "Ordered") {
            orderHistortList[i].medicineStatus = "Cancelled";
            // let medId=orderHistortList[j].medichineID;
            // currentUSerBalance+=orderHistortList[j].medicinePrice;
            // alert(currentUSerBalance);
            for (let j = 0; j < medichineList.length; j++) {
                if (medichineList[j].medichineID == orderHistortList[i].medichineID) {
                    alert("invaliddd");
                    orderHistortList[i].medicineStatus = "Cancelled";
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
                    updateOrderHistory(orderHistortList[i].orderID, orderHistortList[i]);
                    currentUSerBalance += orderHistortList[i].medicinePrice;
                    updateUser(currentUSerID, currentUser);
                    medichineList[j].medichineCount += orderHistortList[i].medichineCount;
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
});
// }
// }
//signUP--------------------------------------------------sign up--------------------------------------------*****
function signUpShow() {
    let uname = document.getElementById('signUPUname').value;
    let mail1 = document.getElementById('signUpmailID').value;
    let pw1 = document.getElementById('signUpPW').value;
    let pw2 = document.getElementById('signUpConPW').value;
    let pn1 = document.getElementById('signUppn').value;
    let SUBlance = document.getElementById('signUpBalance').value;
    //userList.push(new UserDetails(uname,pw1,+SUBlance,+pn1));
    const user1 = {
        userID: undefined,
        userName: uname,
        password: pw1,
        walletBalance: parseFloat(SUBlance),
        phoneNumber: parseInt(pn1)
    };
    addUser(user1);
}
//post
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5144/api/UserDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to Add user');
        }
    });
}
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5144/api/MedichineInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to Add medicine');
        }
    });
}
//add history
function addHistory(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5144/api/OrderHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to Add history');
        }
    });
}
//update user details
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5144/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        checkPurchase();
    });
}
//update medicine info
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5144/api/MedichineInfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update medicine');
        }
    });
}
//update orderhistory
function updateOrderHistory(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5144/api/OrderHistory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
    });
}
//recharge------------------need to change
function updateRecharge(id, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5144/api/UserDetails/${id}/${amount}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(amount)
        });
        if (!response.ok) {
            throw new Error('Failed to update Travel');
        }
    });
}
//delete---order
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5144/api/OrderHistory/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
    });
}
//delete---medichine info
function deleteMedichine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5144/api/MedichineInfo/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete medicine');
        }
    });
}
//fetch-user
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = 'http://localhost:5144/api/UserDetails';
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to Add Contacts');
        }
        return yield response.json();
    });
}
//fetch-medicine
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = 'http://localhost:5144/api/MedichineInfo';
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to Add medicine');
        }
        return yield response.json();
    });
}
//fetch-order history
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = 'http://localhost:5144/api/OrderHistory';
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to Add history');
        }
        return yield response.json();
    });
}
