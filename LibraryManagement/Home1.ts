let currentUserID:number;
let currentUser:UserDetails;


interface UserDetails {
    userID: any;
    userName: string;
    passWord: string;
    gender: string;
    department: string;
    mobileNumber: string;
    emailID: string;
    walletBalance: number;
    photo:string[];
}
interface BookDetails {
    bookID: any;
    bookName: string;
    authorName: string;
    bookCount: number;
}
interface BorrowDetails {
    borrowID: any;
    bookID: number;
    userID: number;
    borrowedDate: Date;
    borrowedBookCount: number;
    status: string;
    paidFineAmount: number;

}
// let editingID:number=0;
// const photoInput=document.getElementById('imageid1') as HTMLInputElement
//signInvisible
function viewSignIn()
{
    let sn=document.getElementById('signinid') as HTMLDivElement;
    sn.style.display="block";
    let su=document.getElementById('signupId') as HTMLDivElement;
    su.style.display="none";
    let main=document.getElementById('main2')as HTMLDivElement;
    main.style.display="block";
}
//signup visible
function viewSignUp()
{
    let sn=document.getElementById('signinid') as HTMLDivElement;
    sn.style.display="none";
    let su=document.getElementById('signupId') as HTMLDivElement;
    su.style.display="block";
    let main=document.getElementById('main2')as HTMLDivElement;
    main.style.display="block";
}
//login
async function loginFun()
{
    let sn=document.getElementById('signinid') as HTMLDivElement;
    sn.style.display="none";
    // let su=document.getElementById('signupId') as HTMLDivElement;
    // su.style.display="none";
    let main=document.getElementById('main2')as HTMLDivElement;
    main.style.display="none";
    let mainn=document.getElementById('menubarid')as HTMLDivElement;
    mainn.style.display="block";
    let name=(document.getElementById('nameid') as HTMLInputElement).value;
    let passWord=(document.getElementById('passWordid') as HTMLInputElement).value;
    const userDetailsList=await fetchUser();
    for(let i=0;i<userDetailsList.length;i++)
    {
        if(userDetailsList[i].userName==name && userDetailsList[i].passWord==passWord)
        {
            alert("sign in successfully!!!");
            currentUserID=userDetailsList[i].userID;
            currentUser=userDetailsList[i];
            alert(currentUserID);
        }
    }
}
//register
function Register()
{
    let name=(document.getElementById('Rname') as HTMLInputElement).value;
    let password1=(document.getElementById('Rpassword') as HTMLInputElement).value;
    let gender1=(document.getElementById('RGender') as HTMLInputElement).value;
    let department1=(document.getElementById('RDepartment') as HTMLInputElement).value;
    let mobileNumber1=(document.getElementById('RmobileNumber') as HTMLInputElement).value;
    let email=(document.getElementById('Rmail') as HTMLInputElement).value;
    let balance=(document.getElementById('Rbalance') as HTMLInputElement).value;
    let editingID:number=0;
    const photo1=document.getElementById('imageid1') as HTMLInputElement;
    const file=photo1.files?.[0];
    const reader=new FileReader();
    if(file){
    reader.readAsDataURL(file)
    reader.onload=function(event)
    {
     const base64String=event.target?.result as string;
    
    const user1:UserDetails={
        userID:undefined,
        userName:name,
        passWord: password1,
        gender:gender1,
        department:department1,
        mobileNumber:mobileNumber1,
        emailID:email,
        walletBalance:Number(balance),
        photo:[base64String]
    };
    addUser(user1);
    alert("registered successfully");
   }
  }  // alert(currentUser.userID);
}
async function showOrderHistory()
{
    let rc=document.getElementById('rechargeID') as HTMLDivElement;
    rc.style.display="none";
    let oh=document.getElementById('orderID') as HTMLDivElement;
    oh.style.display="block";
    let bd=document.getElementById('ticketID') as HTMLDivElement;
    bd.style.display="none";
    let bb=document.getElementById('ticketID3')as HTMLDivElement;
    bb.style.display="none";
    
    let ee=document.getElementById('exitEnd') as HTMLDivElement;
    ee.style.display="none";
    let rb=document.getElementById('returnbook')as HTMLDivElement;
    rb.style.display="none";

    let orderHistorytablebody=document.getElementById("tbody1") as HTMLTableSectionElement;
    orderHistorytablebody.innerHTML="";
    const OrderHistoryList=await fetchBorrow();
    console.log(OrderHistoryList);
    
    for(let i=0;i<OrderHistoryList.length;i++)
    {
        if(currentUserID==OrderHistoryList[i].userID)
        {
            const row=document.createElement("tr");
            row.innerHTML=
            `<td>${OrderHistoryList[i].borrowID}</td>
            <td>${OrderHistoryList[i].bookID}</td>
            <td>${OrderHistoryList[i].userID}</td>
            <td>${OrderHistoryList[i].borrowedDate}</td>
            <td>${OrderHistoryList[i].borrowedBookCount}</td>
            <td>${OrderHistoryList[i].status}</td>
            <td>${OrderHistoryList[i].paidFineAmount}</td>
            `
            //.split('T')[0].split('-').reverse().join('/')
            orderHistorytablebody.appendChild(row);
        }
    }
}
//recharge
function rechargeShow()
{
    let rc=document.getElementById('rechargeID') as HTMLDivElement;
    rc.style.display="block";
}
function recharge()
{
    
    let amount=Number((document.getElementById('amount5') as HTMLInputElement).value);
    currentUser.walletBalance+=Number(amount);
    updateRecharge(currentUserID,currentUser.walletBalance);
    alert(currentUser.walletBalance);
}
//borrow book

//book details
async function showBook()
{

    let oh=document.getElementById('orderID') as HTMLDivElement;
    oh.style.display="none";
    let bd=document.getElementById('ticketID') as HTMLDivElement;
    bd.style.display="block";
    let bb=document.getElementById('ticketID3')as HTMLDivElement;
    bb.style.display="none";
    let rc=document.getElementById('rechargeID') as HTMLDivElement;
    rc.style.display="none";
    let ee=document.getElementById('exitEnd') as HTMLDivElement;
    ee.style.display="none";
    let rb=document.getElementById('returnbook')as HTMLDivElement;
    rb.style.display="none";

    let bookBody=document.getElementById("tbody2") as HTMLTableSectionElement;
    const bookList=await fetchBook();
    bookBody.innerHTML="";
    for(let i=0;i<bookList.length;i++)
    {
        const row=document.createElement("tr");
        row.innerHTML=
        `
        
        <td>${bookList[i].bookID}</td>
        <td>${bookList[i].bookName}</td>
        <td>${bookList[i].authorName}</td>
        <td>${bookList[i].bookCount}</td>
        <td><button onclick="edit(${bookList[i].bookID})">update</button></td>
        <td><button onclick="deleteBookDetails(${bookList[i].bookID})">delete1</button></td>
        `
        bookBody.appendChild(row);
    }

}
//display book details for buy
//book details
async function showBookBuy()
{
    
    let oh=document.getElementById('orderID') as HTMLDivElement;
    oh.style.display="none";
    let bd=document.getElementById('ticketID') as HTMLDivElement;
    bd.style.display="none";
    let bb=document.getElementById('ticketID3')as HTMLDivElement;
    bb.style.display="block";
    let rc=document.getElementById('rechargeID') as HTMLDivElement;
    rc.style.display="none";
    let ee=document.getElementById('exitEnd') as HTMLDivElement;
    ee.style.display="none";
    let rb=document.getElementById('returnbook')as HTMLDivElement;
    rb.style.display="none";

    let bookBody=document.getElementById("tbody4") as HTMLTableSectionElement;
    const bookList=await fetchBook();
    bookBody.innerHTML="";
    for(let i=0;i<bookList.length;i++)
    {
        const row=document.createElement("tr");
        row.innerHTML=
        `
        
        <td>${bookList[i].bookID}</td>
        <td>${bookList[i].bookName}</td>
        <td>${bookList[i].authorName}</td>
        <td>${bookList[i].bookCount}</td>
        <td><img src='${currentUser.photo}'>
        </td>
        <td><button onclick="buy(${bookList[i].bookID})">buy</button></td>
        `
        bookBody.appendChild(row);
    }

}
async function buy(BID:number)
{
    
    let oh=document.getElementById('countdis') as HTMLDivElement;
    oh.style.display="block";
    let totBookCount=0;
    let borrowedList=await fetchBorrow();
    for(let x=0;x<borrowedList.length;x++)
    {
        if(borrowedList[x].userID==currentUserID && borrowedList[x].status=="Borrowed")
        {
            totBookCount+=borrowedList[x].borrowedBookCount;
            
        }
    }
    alert("total book count");
    alert(totBookCount);
    var bCount=Number((document.getElementById('userBookCount') as HTMLInputElement).value);
    const bookList=await fetchBook();
    for(let i=0;i<bookList.length;i++)
    {
        if(BID==bookList[i].bookID)
        {
            if(bookList[i].bookCount>bCount && bookList[i].bookCount>0 &&bCount<3)
            {
                alert("book count is available");
                const borrowList=await fetchBorrow();
                for(let k=0;k<borrowList.length;k++)
                {
                    //alert(5);
                    
                        alert(10);
                        if(totBookCount+bCount<=3)
                        {
                            alert(20)
                            const borrow1:BorrowDetails=
                            {
                                borrowID: undefined,
                                bookID: bookList[i].bookID,
                                userID: currentUserID,
                                borrowedDate:new Date(),
                                borrowedBookCount: bCount,
                                status: "Ordered",
                                paidFineAmount: 0
                            };
                            addBorrow(borrow1);
                            alert("booked successfully")
                            break;

                        }
                        else
                        {
                            alert("maximum limit is 3 count only");
                            break;
                        }
                    
                }
            }
            else{
                alert("Book count is not availabe or yuou may choose more than 3 books");
                break;
            }
        }
    }
}
function deleteBookDetails(BID:number)
{
    deleteBook(BID);
    showBook();

}
//edit
let medIndex: number = 0;
async function edit(count: number) {
    let oh=document.getElementById('edit') as HTMLDivElement;
    oh.style.display="block";
  const bookList = await fetchBook();
  medIndex = count;
  for (var i = 0; i < bookList.length; i++) {
    if (bookList[i].bookID== medIndex) {
      (document.getElementById('edit-name') as HTMLInputElement).value = bookList[i].bookName.toString();
      (document.getElementById('edit-author') as HTMLInputElement).value = bookList[i].authorName.toString();
      (document.getElementById('edit-count') as HTMLInputElement).value = bookList[i].bookCount.toString();

    }
  }
}

async function ShowEdit() {
  const bookList = await fetchBook();
  for (var i = 0; i < bookList.length; i++) {
    if (bookList[i].bookID == medIndex) {
        bookList[i].bookName = (document.getElementById('edit-name') as HTMLInputElement).value;
        bookList[i].authorName = (document.getElementById('edit-author') as HTMLInputElement).value;
        bookList[i].bookCount = Number((document.getElementById('edit-count') as HTMLInputElement).value);

        updateBook(bookList[i].bookID, bookList[i]);
        (document.getElementById('edit-name') as HTMLInputElement).value = "";
        (document.getElementById('edit-author') as HTMLInputElement).value = "";
        (document.getElementById('edit-count') as HTMLInputElement).value = "";
        showBook();

    }
  }
}
async function returnBook()
{
       
    let oh=document.getElementById('orderID') as HTMLDivElement;
    oh.style.display="none";
    let bd=document.getElementById('ticketID') as HTMLDivElement;
    bd.style.display="none";
    let bb=document.getElementById('ticketID3')as HTMLDivElement;
    bb.style.display="none";
    let rc=document.getElementById('rechargeID') as HTMLDivElement;
    rc.style.display="none";
    let ee=document.getElementById('exitEnd') as HTMLDivElement;
    ee.style.display="none";
    let rb=document.getElementById('returnbook')as HTMLDivElement;
    rb.style.display="block";

    let orderHistorytablebody=document.getElementById("tbody3") as HTMLTableSectionElement;
    orderHistorytablebody.innerHTML="";
    const OrderHistoryList=await fetchBorrow();
    console.log(OrderHistoryList);
    
    for(let i=0;i<OrderHistoryList.length;i++)
    {
        if(currentUserID==OrderHistoryList[i].userID && OrderHistoryList[i].status=="Borrowed")
        {
            const row=document.createElement("tr");
            row.innerHTML=
            `<td>${OrderHistoryList[i].borrowID}</td>
            <td>${OrderHistoryList[i].bookID}</td>
            <td>${OrderHistoryList[i].userID}</td>
            <td>${OrderHistoryList[i].borrowedDate}</td>
            <td>${OrderHistoryList[i].borrowedBookCount}</td>
            <td>${OrderHistoryList[i].status}</td>
            <td>${OrderHistoryList[i].paidFineAmount}</td>
            <td><button onclick="CancelOrder(${OrderHistoryList[i].borrowID})">Cancel</button></td>

            `
            //.split('T')[0].split('-').reverse().join('/')
            orderHistorytablebody.appendChild(row);
        }
    }
 
}
let borrowed:string;
async function CancelOrder(id:number)
{
    alert("Welcome to return");
    let date1=new Date();
    alert(date1);
    const borrowList=await fetchBorrow();
    for(let i=0;i<borrowList.length;i++)
    {
        if(borrowList[i].borrowID==id)
        {
            borrowed=(borrowList[i].borrowedDate).toString().substring(0,10);
        }
    }
    let diff=new Date(borrowed.substring(0,10)).getTime()-date1.getTime();
    alert(diff);
    let diffdays=Math.ceil(diff/(1000*3600*24));
    alert(diffdays);
    diffdays=Math.abs(diffdays);
    let fineAmount;
    for(let i=0;i<borrowList.length;i++)
    {
        if(borrowList[i].borrowID==id)
        {
            if(diffdays<15)
            {
                const returnBook:BorrowDetails=
                {
                    borrowID:id,
                    bookID:borrowList[i].bookID,
                    userID:borrowList[i].userID,
                    borrowedDate:borrowList[i].borrowedDate,
                    status:"Returned",
                    paidFineAmount:borrowList[i].paidFineAmount,
                    borrowedBookCount:borrowList[i].borrowedBookCount            
                }
                updateBorrow(borrowList[i].borrowID,returnBook);
                const bookList=await fetchBook()
                for(let j=0;j<bookList.length;j++)
                {
                    if(bookList[j].bookID==borrowList[i].bookID)
                    {
                        let count=borrowList[i].borrowedBookCount;
                        const resturncount:BookDetails=
                        {
                            bookID:bookList[j].bookID,
                            bookName:bookList[j].bookName,
                            authorName:bookList[j].authorName,
                            bookCount:count
                        }
                        updateBook(bookList[j].bookID,resturncount)
                    }
                }
            }
            else if(diffdays>15)
                {
                    let days=diffdays;
                    fineAmount=days;
                    const userDetailsList=await fetchUser();
                    for(let i=0;i<userDetailsList.length;i++)
                    {
                        if(borrowList[i].userID==currentUserID)
                        {
                            if(userDetailsList[i].walletBalance>fineAmount)
                            {
                                let newbalance=userDetailsList[i].walletBalance=fineAmount;
                                const balupdate:UserDetails={
                                    userID:currentUserID,
                                    userName:userDetailsList[i].userName,
                                    gender:userDetailsList[i].gender,
                                    department:userDetailsList[i].department,
                                    mobileNumber:userDetailsList[i].mobileNumber,
                                    walletBalance:userDetailsList[i].walletBalance,
                                    emailID:userDetailsList[i].emailID,
                                    passWord:userDetailsList[i].passWord,
                                    photo:userDetailsList[i].photo

                                }
                                updateUser(currentUserID,balupdate);
                                alert(userDetailsList[i].walletBalance);

                                const bookList=await fetchBook();
                                for(let j=0;j<bookList.length;j++)
                                {
                                    if(bookList[j].bookID==borrowList[i].bookID)
                                    {
                                        let count=borrowList[i].borrowedBookCount;
                                        const returncount:BookDetails=
                                        {
                                            bookID:bookList[j].bookID,
                                            bookName:bookList[j].bookName,
                                            authorName:bookList[j].authorName,
                                            bookCount:count
                                        }
                                        updateBook(bookList[j].bookID,returncount);
                                        alert(bookList[j].bookCount);
                                    }
                                }
                            }
                            const returnbook:BorrowDetails=
                            {
                                borrowID:id,
                                bookID:borrowList[i].bookID,
                                userID:borrowList[i].userID,
                                borrowedDate:borrowList[i].borrowedDate,
                                status:"Returned",
                                paidFineAmount:fineAmount,
                                borrowedBookCount:borrowList[i].borrowedBookCount
                            }
                            updateBorrow(borrowList[i].borrowID,returnbook);
                        }
                        else{
                            alert("Insufficient balanc");
                        }
                    }
                }
        }
    }
}
function exit()
{
    let oh=document.getElementById('orderID') as HTMLDivElement;
    oh.style.display="none";
    let bd=document.getElementById('ticketID') as HTMLDivElement;
    bd.style.display="none";
    let bb=document.getElementById('ticketID3')as HTMLDivElement;
    bb.style.display="none";
    let rc=document.getElementById('rechargeID') as HTMLDivElement;
    rc.style.display="none";
    let ee=document.getElementById('exitEnd') as HTMLDivElement;
    ee.style.display="block";
    let rb=document.getElementById('returnbook')as HTMLDivElement;
    rb.style.display="none";
}
async function exportprint()
{
    const borrowList=await fetchBorrow();
    let a=document.createElement('a');
    let data="Borrowid,bookID,borrowdate,count,status,fine"
    for(var i=0;i<borrowList.length;i++)
    {
        data=data + "\n" + `${borrowList[i].borrowID},${borrowList[i].bookID},${borrowList[i].borrowedDate},${borrowList[i].borrowedBookCount},${borrowList[i].status},${borrowList[i].paidFineAmount}+\n`
    }
    const blob=new Blob([data],{type:'text/csv'});
    const url=URL.createObjectURL(blob);
    a.href=url;
    a.download='Borrowhistory.csv';
    a.click();
}
//http://localhost:5106/api/UserDetails
//http://localhost:5106/api/BookDetails
//http://localhost:5106/api/BorrowDetails
//post
async function addUser(user: UserDetails): Promise<void> {
    const response = await fetch('http://localhost:5106/api/UserDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to Add User');
    }
}
async function addBook(book: BookDetails): Promise<void> {
    const response = await fetch('http://localhost:5106/api/BookDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error('Failed to Add User');
    }
}
async function addBorrow(borrow: BorrowDetails): Promise<void> {
    const response = await fetch('http://localhost:5106/api/BorrowDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if (!response.ok) {
        throw new Error('Failed to Add User');
    }
}
//update
async function updateUser(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5106/api/UserDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update Ticket');
    }
}
async function updateBorrow(id: number, borrow: BorrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5106/api/BorrowDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if (!response.ok) {
        throw new Error('Failed to update Ticket');
    }
}
async function updateBook(id: number, book: BookDetails): Promise<void> {
    const response = await fetch(`http://localhost:5106/api/BookDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error('Failed to update Ticket');
    }
}
//delete
async function deleteBook(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5106/api/BookDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
   
  }
  //fetch
  //fetch
async function fetchUser():Promise<UserDetails[]> {
    const apiURL='http://localhost:5106/api/UserDetails';
    const response=await fetch(apiURL);
        
        if(!response.ok){
            throw new Error('Failed to Add Contacts');
        }
        return await response.json();
}

async function fetchBook():Promise<BookDetails[]> {
    const apiURL='http://localhost:5106/api/BookDetails';
    const response=await fetch(apiURL);
        
        if(!response.ok){
            throw new Error('Failed to Add Contacts');
        }
        return await response.json();
}
async function fetchBorrow():Promise<BorrowDetails[]> {
    const apiURL='http://localhost:5106/api/BorrowDetails';
    const response=await fetch(apiURL);
        
        if(!response.ok){
            throw new Error('Failed to Add borrow');
        }
        return await response.json();
}
//recharge
async function updateRecharge(id:number,amount:number):Promise<void> {
    const response=await fetch(`http://localhost:5106/api/UserDetails/${id}/${amount}`,{
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