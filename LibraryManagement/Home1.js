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
let currentUserID;
let currentUser;
// let editingID:number=0;
// const photoInput=document.getElementById('imageid1') as HTMLInputElement
//signInvisible
function viewSignIn() {
    let sn = document.getElementById('signinid');
    sn.style.display = "block";
    let su = document.getElementById('signupId');
    su.style.display = "none";
    let main = document.getElementById('main2');
    main.style.display = "block";
}
//signup visible
function viewSignUp() {
    let sn = document.getElementById('signinid');
    sn.style.display = "none";
    let su = document.getElementById('signupId');
    su.style.display = "block";
    let main = document.getElementById('main2');
    main.style.display = "block";
}
//login
function loginFun() {
    return __awaiter(this, void 0, void 0, function* () {
        let sn = document.getElementById('signinid');
        sn.style.display = "none";
        // let su=document.getElementById('signupId') as HTMLDivElement;
        // su.style.display="none";
        let main = document.getElementById('main2');
        main.style.display = "none";
        let mainn = document.getElementById('menubarid');
        mainn.style.display = "block";
        let name = document.getElementById('nameid').value;
        let passWord = document.getElementById('passWordid').value;
        const userDetailsList = yield fetchUser();
        for (let i = 0; i < userDetailsList.length; i++) {
            if (userDetailsList[i].userName == name && userDetailsList[i].passWord == passWord) {
                alert("sign in successfully!!!");
                currentUserID = userDetailsList[i].userID;
                currentUser = userDetailsList[i];
                alert(currentUserID);
            }
        }
    });
}
//register
function Register() {
    var _a;
    let name = document.getElementById('Rname').value;
    let password1 = document.getElementById('Rpassword').value;
    let gender1 = document.getElementById('RGender').value;
    let department1 = document.getElementById('RDepartment').value;
    let mobileNumber1 = document.getElementById('RmobileNumber').value;
    let email = document.getElementById('Rmail').value;
    let balance = document.getElementById('Rbalance').value;
    let editingID = 0;
    const photo1 = document.getElementById('imageid1');
    const file = (_a = photo1.files) === null || _a === void 0 ? void 0 : _a[0];
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            var _a;
            const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const user1 = {
                userID: undefined,
                userName: name,
                passWord: password1,
                gender: gender1,
                department: department1,
                mobileNumber: mobileNumber1,
                emailID: email,
                walletBalance: Number(balance),
                photo: [base64String]
            };
            addUser(user1);
            alert("registered successfully");
        };
    } // alert(currentUser.userID);
}
function showOrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let rc = document.getElementById('rechargeID');
        rc.style.display = "none";
        let oh = document.getElementById('orderID');
        oh.style.display = "block";
        let bd = document.getElementById('ticketID');
        bd.style.display = "none";
        let bb = document.getElementById('ticketID3');
        bb.style.display = "none";
        let ee = document.getElementById('exitEnd');
        ee.style.display = "none";
        let rb = document.getElementById('returnbook');
        rb.style.display = "none";
        let orderHistorytablebody = document.getElementById("tbody1");
        orderHistorytablebody.innerHTML = "";
        const OrderHistoryList = yield fetchBorrow();
        console.log(OrderHistoryList);
        for (let i = 0; i < OrderHistoryList.length; i++) {
            if (currentUserID == OrderHistoryList[i].userID) {
                const row = document.createElement("tr");
                row.innerHTML =
                    `<td>${OrderHistoryList[i].borrowID}</td>
            <td>${OrderHistoryList[i].bookID}</td>
            <td>${OrderHistoryList[i].userID}</td>
            <td>${OrderHistoryList[i].borrowedDate}</td>
            <td>${OrderHistoryList[i].borrowedBookCount}</td>
            <td>${OrderHistoryList[i].status}</td>
            <td>${OrderHistoryList[i].paidFineAmount}</td>
            `;
                //.split('T')[0].split('-').reverse().join('/')
                orderHistorytablebody.appendChild(row);
            }
        }
    });
}
//recharge
function rechargeShow() {
    let rc = document.getElementById('rechargeID');
    rc.style.display = "block";
}
function recharge() {
    let amount = Number(document.getElementById('amount5').value);
    currentUser.walletBalance += Number(amount);
    updateRecharge(currentUserID, currentUser.walletBalance);
    alert(currentUser.walletBalance);
}
//borrow book
//book details
function showBook() {
    return __awaiter(this, void 0, void 0, function* () {
        let oh = document.getElementById('orderID');
        oh.style.display = "none";
        let bd = document.getElementById('ticketID');
        bd.style.display = "block";
        let bb = document.getElementById('ticketID3');
        bb.style.display = "none";
        let rc = document.getElementById('rechargeID');
        rc.style.display = "none";
        let ee = document.getElementById('exitEnd');
        ee.style.display = "none";
        let rb = document.getElementById('returnbook');
        rb.style.display = "none";
        let bookBody = document.getElementById("tbody2");
        const bookList = yield fetchBook();
        bookBody.innerHTML = "";
        for (let i = 0; i < bookList.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML =
                `
        
        <td>${bookList[i].bookID}</td>
        <td>${bookList[i].bookName}</td>
        <td>${bookList[i].authorName}</td>
        <td>${bookList[i].bookCount}</td>
        <td><button onclick="edit(${bookList[i].bookID})">update</button></td>
        <td><button onclick="deleteBookDetails(${bookList[i].bookID})">delete1</button></td>
        `;
            bookBody.appendChild(row);
        }
    });
}
//display book details for buy
//book details
function showBookBuy() {
    return __awaiter(this, void 0, void 0, function* () {
        let oh = document.getElementById('orderID');
        oh.style.display = "none";
        let bd = document.getElementById('ticketID');
        bd.style.display = "none";
        let bb = document.getElementById('ticketID3');
        bb.style.display = "block";
        let rc = document.getElementById('rechargeID');
        rc.style.display = "none";
        let ee = document.getElementById('exitEnd');
        ee.style.display = "none";
        let rb = document.getElementById('returnbook');
        rb.style.display = "none";
        let bookBody = document.getElementById("tbody4");
        const bookList = yield fetchBook();
        bookBody.innerHTML = "";
        for (let i = 0; i < bookList.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML =
                `
        
        <td>${bookList[i].bookID}</td>
        <td>${bookList[i].bookName}</td>
        <td>${bookList[i].authorName}</td>
        <td>${bookList[i].bookCount}</td>
        <td><img src='${currentUser.photo}'>
        </td>
        <td><button onclick="buy(${bookList[i].bookID})">buy</button></td>
        `;
            bookBody.appendChild(row);
        }
    });
}
function buy(BID) {
    return __awaiter(this, void 0, void 0, function* () {
        let oh = document.getElementById('countdis');
        oh.style.display = "block";
        let totBookCount = 0;
        let borrowedList = yield fetchBorrow();
        for (let x = 0; x < borrowedList.length; x++) {
            if (borrowedList[x].userID == currentUserID && borrowedList[x].status == "Borrowed") {
                totBookCount += borrowedList[x].borrowedBookCount;
            }
        }
        alert("total book count");
        alert(totBookCount);
        var bCount = Number(document.getElementById('userBookCount').value);
        const bookList = yield fetchBook();
        for (let i = 0; i < bookList.length; i++) {
            if (BID == bookList[i].bookID) {
                if (bookList[i].bookCount > bCount && bookList[i].bookCount > 0 && bCount < 3) {
                    alert("book count is available");
                    const borrowList = yield fetchBorrow();
                    for (let k = 0; k < borrowList.length; k++) {
                        //alert(5);
                        alert(10);
                        if (totBookCount + bCount <= 3) {
                            alert(20);
                            const borrow1 = {
                                borrowID: undefined,
                                bookID: bookList[i].bookID,
                                userID: currentUserID,
                                borrowedDate: new Date(),
                                borrowedBookCount: bCount,
                                status: "Ordered",
                                paidFineAmount: 0
                            };
                            addBorrow(borrow1);
                            alert("booked successfully");
                            break;
                        }
                        else {
                            alert("maximum limit is 3 count only");
                            break;
                        }
                    }
                }
                else {
                    alert("Book count is not availabe or yuou may choose more than 3 books");
                    break;
                }
            }
        }
    });
}
function deleteBookDetails(BID) {
    deleteBook(BID);
    showBook();
}
//edit
let medIndex = 0;
function edit(count) {
    return __awaiter(this, void 0, void 0, function* () {
        let oh = document.getElementById('edit');
        oh.style.display = "block";
        const bookList = yield fetchBook();
        medIndex = count;
        for (var i = 0; i < bookList.length; i++) {
            if (bookList[i].bookID == medIndex) {
                document.getElementById('edit-name').value = bookList[i].bookName.toString();
                document.getElementById('edit-author').value = bookList[i].authorName.toString();
                document.getElementById('edit-count').value = bookList[i].bookCount.toString();
            }
        }
    });
}
function ShowEdit() {
    return __awaiter(this, void 0, void 0, function* () {
        const bookList = yield fetchBook();
        for (var i = 0; i < bookList.length; i++) {
            if (bookList[i].bookID == medIndex) {
                bookList[i].bookName = document.getElementById('edit-name').value;
                bookList[i].authorName = document.getElementById('edit-author').value;
                bookList[i].bookCount = Number(document.getElementById('edit-count').value);
                updateBook(bookList[i].bookID, bookList[i]);
                document.getElementById('edit-name').value = "";
                document.getElementById('edit-author').value = "";
                document.getElementById('edit-count').value = "";
                showBook();
            }
        }
    });
}
function returnBook() {
    return __awaiter(this, void 0, void 0, function* () {
        let oh = document.getElementById('orderID');
        oh.style.display = "none";
        let bd = document.getElementById('ticketID');
        bd.style.display = "none";
        let bb = document.getElementById('ticketID3');
        bb.style.display = "none";
        let rc = document.getElementById('rechargeID');
        rc.style.display = "none";
        let ee = document.getElementById('exitEnd');
        ee.style.display = "none";
        let rb = document.getElementById('returnbook');
        rb.style.display = "block";
        let orderHistorytablebody = document.getElementById("tbody3");
        orderHistorytablebody.innerHTML = "";
        const OrderHistoryList = yield fetchBorrow();
        console.log(OrderHistoryList);
        for (let i = 0; i < OrderHistoryList.length; i++) {
            if (currentUserID == OrderHistoryList[i].userID && OrderHistoryList[i].status == "Borrowed") {
                const row = document.createElement("tr");
                row.innerHTML =
                    `<td>${OrderHistoryList[i].borrowID}</td>
            <td>${OrderHistoryList[i].bookID}</td>
            <td>${OrderHistoryList[i].userID}</td>
            <td>${OrderHistoryList[i].borrowedDate}</td>
            <td>${OrderHistoryList[i].borrowedBookCount}</td>
            <td>${OrderHistoryList[i].status}</td>
            <td>${OrderHistoryList[i].paidFineAmount}</td>
            <td><button onclick="CancelOrder(${OrderHistoryList[i].borrowID})">Cancel</button></td>

            `;
                //.split('T')[0].split('-').reverse().join('/')
                orderHistorytablebody.appendChild(row);
            }
        }
    });
}
let borrowed;
function CancelOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        alert("Welcome to return");
        let date1 = new Date();
        alert(date1);
        const borrowList = yield fetchBorrow();
        for (let i = 0; i < borrowList.length; i++) {
            if (borrowList[i].borrowID == id) {
                borrowed = (borrowList[i].borrowedDate).toString().substring(0, 10);
            }
        }
        let diff = new Date(borrowed.substring(0, 10)).getTime() - date1.getTime();
        alert(diff);
        let diffdays = Math.ceil(diff / (1000 * 3600 * 24));
        alert(diffdays);
        diffdays = Math.abs(diffdays);
        let fineAmount;
        for (let i = 0; i < borrowList.length; i++) {
            if (borrowList[i].borrowID == id) {
                if (diffdays < 15) {
                    const returnBook = {
                        borrowID: id,
                        bookID: borrowList[i].bookID,
                        userID: borrowList[i].userID,
                        borrowedDate: borrowList[i].borrowedDate,
                        status: "Returned",
                        paidFineAmount: borrowList[i].paidFineAmount,
                        borrowedBookCount: borrowList[i].borrowedBookCount
                    };
                    updateBorrow(borrowList[i].borrowID, returnBook);
                    const bookList = yield fetchBook();
                    for (let j = 0; j < bookList.length; j++) {
                        if (bookList[j].bookID == borrowList[i].bookID) {
                            let count = borrowList[i].borrowedBookCount;
                            const resturncount = {
                                bookID: bookList[j].bookID,
                                bookName: bookList[j].bookName,
                                authorName: bookList[j].authorName,
                                bookCount: count
                            };
                            updateBook(bookList[j].bookID, resturncount);
                        }
                    }
                }
                else if (diffdays > 15) {
                    let days = diffdays;
                    fineAmount = days;
                    const userDetailsList = yield fetchUser();
                    for (let i = 0; i < userDetailsList.length; i++) {
                        if (borrowList[i].userID == currentUserID) {
                            if (userDetailsList[i].walletBalance > fineAmount) {
                                let newbalance = userDetailsList[i].walletBalance = fineAmount;
                                const balupdate = {
                                    userID: currentUserID,
                                    userName: userDetailsList[i].userName,
                                    gender: userDetailsList[i].gender,
                                    department: userDetailsList[i].department,
                                    mobileNumber: userDetailsList[i].mobileNumber,
                                    walletBalance: userDetailsList[i].walletBalance,
                                    emailID: userDetailsList[i].emailID,
                                    passWord: userDetailsList[i].passWord,
                                    photo: userDetailsList[i].photo
                                };
                                updateUser(currentUserID, balupdate);
                                alert(userDetailsList[i].walletBalance);
                                const bookList = yield fetchBook();
                                for (let j = 0; j < bookList.length; j++) {
                                    if (bookList[j].bookID == borrowList[i].bookID) {
                                        let count = borrowList[i].borrowedBookCount;
                                        const returncount = {
                                            bookID: bookList[j].bookID,
                                            bookName: bookList[j].bookName,
                                            authorName: bookList[j].authorName,
                                            bookCount: count
                                        };
                                        updateBook(bookList[j].bookID, returncount);
                                        alert(bookList[j].bookCount);
                                    }
                                }
                            }
                            const returnbook = {
                                borrowID: id,
                                bookID: borrowList[i].bookID,
                                userID: borrowList[i].userID,
                                borrowedDate: borrowList[i].borrowedDate,
                                status: "Returned",
                                paidFineAmount: fineAmount,
                                borrowedBookCount: borrowList[i].borrowedBookCount
                            };
                            updateBorrow(borrowList[i].borrowID, returnbook);
                        }
                        else {
                            alert("Insufficient balanc");
                        }
                    }
                }
            }
        }
    });
}
function exit() {
    let oh = document.getElementById('orderID');
    oh.style.display = "none";
    let bd = document.getElementById('ticketID');
    bd.style.display = "none";
    let bb = document.getElementById('ticketID3');
    bb.style.display = "none";
    let rc = document.getElementById('rechargeID');
    rc.style.display = "none";
    let ee = document.getElementById('exitEnd');
    ee.style.display = "block";
    let rb = document.getElementById('returnbook');
    rb.style.display = "none";
}
function exportprint() {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowList = yield fetchBorrow();
        let a = document.createElement('a');
        let data = "Borrowid,bookID,borrowdate,count,status,fine";
        for (var i = 0; i < borrowList.length; i++) {
            data = data + "\n" + `${borrowList[i].borrowID},${borrowList[i].bookID},${borrowList[i].borrowedDate},${borrowList[i].borrowedBookCount},${borrowList[i].status},${borrowList[i].paidFineAmount}+\n`;
        }
        const blob = new Blob([data], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'Borrowhistory.csv';
        a.click();
    });
}
//http://localhost:5106/api/UserDetails
//http://localhost:5106/api/BookDetails
//http://localhost:5106/api/BorrowDetails
//post
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5106/api/UserDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to Add User');
        }
    });
}
function addBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5106/api/BookDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to Add User');
        }
    });
}
function addBorrow(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5106/api/BorrowDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to Add User');
        }
    });
}
//update
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5106/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update Ticket');
        }
    });
}
function updateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5106/api/BorrowDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update Ticket');
        }
    });
}
function updateBook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5106/api/BookDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to update Ticket');
        }
    });
}
//delete
function deleteBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5106/api/BookDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
//fetch
//fetch
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = 'http://localhost:5106/api/UserDetails';
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to Add Contacts');
        }
        return yield response.json();
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = 'http://localhost:5106/api/BookDetails';
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to Add Contacts');
        }
        return yield response.json();
    });
}
function fetchBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = 'http://localhost:5106/api/BorrowDetails';
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to Add borrow');
        }
        return yield response.json();
    });
}
//recharge
function updateRecharge(id, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5106/api/UserDetails/${id}/${amount}`, {
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
