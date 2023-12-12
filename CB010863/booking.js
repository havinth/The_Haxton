


const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const countryInput = document.getElementById('country');

const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const noAdultsInput = document.getElementById('noadults');
const noChildrenInput = document.getElementById('nochildren');
const singleRoomsInput = document.getElementById('single');
const doubleRoomsInput = document.getElementById('double');
const tripleRoomsInput = document.getElementById('triple');
const mealsKidsInput = document.getElementById('kidsmeal');
const wifiCheckbox = document.getElementById('wifi');
const poolViewCheckbox = document.getElementById('poolView');
const gardenViewCheckbox = document.getElementById('gardenView');
const extraBedCheckbox = document.getElementById('extraBed');
const bookingOutput = document.getElementById('bookingOutput');
const promoCodeInput = document.getElementById('promoCode')
const roomfavbtn = document.getElementById('addfav')


const localAdultsInput = document.getElementById('localAdults');
const localChildrenInput = document.getElementById('localChildren');
const foreignAdultsInput = document.getElementById('foreignAdults');
const foreignChildrenInput = document.getElementById('foreignChildren');
const advTypeSelect = document.getElementById('advType');
const adultGuideCheckbox = document.getElementById('adultGuide');
const kidGuideCheckbox = document.getElementById('kidGuide');
const bookAdventureButton = document.getElementById('bookAdventureButton');
const bookRoomButton = document.getElementById('bookRoomButton');
const loyaltyCheckBtn = document.getElementById("loyaltybtn");
const loyaltyField = document.getElementById('loyalty');
const advenbtn = document.getElementById('advenbtn');
const bookTable = document.getElementById('bookdetails');
const advTable = document.getElementById('advdetails');

// Add click event listeners to the respective buttons
bookRoomButton.addEventListener('click', () => {
    if (validateRoomBooking()){
        updateLoyaltyPoints();
        bookRoom();
        bookTable.scrollIntoView({ behavior : 'smooth', block : 'center'});
    }
});
bookAdventureButton.addEventListener('click', () => {
    if (validateAdventureBooking()){
        bookAdventure();
        advTable.scrollIntoView({ behavior : 'smooth', block : 'center'});
    }
});

fnameInput.addEventListener('input', calculateTotalPrice);
lnameInput.addEventListener('input', calculateTotalPrice);
emailInput.addEventListener('input', calculateTotalPrice);
phoneInput.addEventListener('input', calculateTotalPrice);
countryInput.addEventListener('input', calculateTotalPrice);

checkInInput.addEventListener('input', calculateTotalPrice);
checkOutInput.addEventListener('input', calculateTotalPrice);
noAdultsInput.addEventListener('input', calculateTotalPrice);
noChildrenInput.addEventListener('input', calculateTotalPrice);
singleRoomsInput.addEventListener('input', calculateTotalPrice);
doubleRoomsInput.addEventListener('input', calculateTotalPrice);
tripleRoomsInput.addEventListener('input', calculateTotalPrice);
mealsKidsInput.addEventListener('input', calculateTotalPrice);
wifiCheckbox.addEventListener('change', calculateTotalPrice);
poolViewCheckbox.addEventListener('change', calculateTotalPrice);
gardenViewCheckbox.addEventListener('change', calculateTotalPrice);
extraBedCheckbox.addEventListener('change', calculateTotalPrice);

roomfavbtn.addEventListener('click', saveRoomFav);
advenbtn.addEventListener('click', saveAdvFav);

localAdultsInput.addEventListener('input', calculateAdventurePrice);
localChildrenInput.addEventListener('input', calculateAdventurePrice);
foreignAdultsInput.addEventListener('input', calculateAdventurePrice);
foreignChildrenInput.addEventListener('input', calculateAdventurePrice);
advTypeSelect.addEventListener('change', calculateAdventurePrice);
adultGuideCheckbox.addEventListener('change', calculateAdventurePrice);
kidGuideCheckbox.addEventListener('change', calculateAdventurePrice);
loyaltyCheckBtn.addEventListener("click", checkLoyaltyPoints);

promoCodeInput.addEventListener('input', calculateTotalPrice)


function calculateStayDuration(){
    const checkIn = new Date(checkInInput.value);
    const checkout = new Date(checkOutInput.value);

    const diffrenceintime = checkout - checkIn ;

    const stayduration = diffrenceintime /(1000 * 3600 * 24);

    return stayduration;
}

function calculateTotalPrice() {

    const stayduration = calculateStayDuration();

    // Constants for room prices
    const singleRoomPrice = 25000.00;
    const doubleRoomPrice = 35000.00;
    const tripleRoomPrice = 40000.00;
    const mealsPerChildPrice = 5000.00;
    const extraBedPrice = 8000.00;

    // Get input values
    const singleRooms = parseInt(document.getElementById('single').value) || 0;
    const doubleRooms = parseInt(document.getElementById('double').value) || 0;
    const tripleRooms = parseInt(document.getElementById('triple').value) || 0;
    const mealsKids = parseInt(document.getElementById('kidsmeal').value) || 0;
    const promoCode = document.getElementById('promoCode').value;
    // const extraBed = extraBedCheckbox.Checked;

    let totalPrice = 0;

    totalPrice =(singleRooms * singleRoomPrice) +(doubleRooms * doubleRoomPrice) + (tripleRooms * tripleRoomPrice);

    totalPrice += mealsPerChildPrice * mealsKids;

    if (extraBedCheckbox.checked){
        totalPrice += extraBedPrice;
    } 

    totalPrice = totalPrice * stayduration

    let promovalue = totalPrice * 0.05

    // Check if promo code is valid
    if (promoCode == 'Promo123') {
        totalPrice -= promovalue;
    }



    // Display the total price
    const bookingOutput = document.getElementById('bookingOutput');
    bookingOutput.innerHTML = `LKR ${totalPrice.toFixed(2)}`;
}

function calculateAdventurePrice() {
    // Constants for adventure prices
    const divingLocalAdultsPrice = 5000.00;
    const divingLocalKidsPrice = 2000.00;
    const divingForeignAdultsPrice = 10000.00;
    const divingForeignKidsPrice = 5000.00;
    const extraChargeAdult = 1000.00;
    const extraChargeKids = 500.00;

    // Get input values
    const localAdults = parseInt(document.getElementById('localAdults').value) || 0;
    const localChildren = parseInt(document.getElementById('localChildren').value) || 0;
    const foreignAdults = parseInt(document.getElementById('foreignAdults').value) || 0;
    const foreignChildren = parseInt(document.getElementById('foreignChildren').value) || 0;
    const advType = document.getElementById('advType').value;
    const adultGuide = document.getElementById('adultGuide').checked;
    const kidGuide = document.getElementById('kidGuide').checked;

    let totalPrice = 0;

    totalPrice += localAdults * divingLocalAdultsPrice;
    totalPrice += localChildren * divingLocalKidsPrice;
    totalPrice += foreignAdults * divingForeignAdultsPrice;
    totalPrice += foreignChildren * divingForeignKidsPrice;

    // Add extra charges for guides
    if (adultGuide) {
        totalPrice += extraChargeAdult ;
    }
    if (kidGuide) {
        totalPrice += extraChargeKids ;
    }
    
    const bookingOutput = document.getElementById('advbookingOutput');
    bookingOutput.innerText = `LKR ${totalPrice}.00`;
 

}

function bookRoom() {
    // Retrieve values from the room booking form
    const fname = fnameInput.value;
    const lname = lnameInput.value;
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const noAdults = noAdultsInput.value;
    const noChildren = noChildrenInput.value;
    const singleRooms = singleRoomsInput.value;
    const doubleRooms = doubleRoomsInput.value;
    const tripleRooms = tripleRoomsInput.value;
    const extraBed = extraBedCheckbox.checked ? "Yes" : "No";
    const totalCost = document.getElementById('bookingOutput').innerText;

    // Insert data into the room booking table
    const booklist = document.getElementById('booklist');
    const newRow = booklist.insertRow(-1);
    newRow.innerHTML = `<td>${fname} ${lname}</td>
                        <td>${checkIn}</td>
                        <td>${checkOut}</td>
                        <td>${noAdults}</td>
                        <td>${noChildren}</td>
                        <td>${singleRooms}</td>
                        <td>${doubleRooms}</td>
                        <td>${tripleRooms}</td>
                        <td>${extraBed}</td>
                        <td>${totalCost}</td>`;

    // Reset room booking form fields
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingOutput').innerText = "LKR 0.00";
}

function bookAdventure() {
    // Retrieve values from the adventure form
    const fname = fnameInput.value;
    const lname = lnameInput.value;
    const advType = advTypeSelect.value;
    const localAdults = localAdultsInput.value;
    const localChildren = localChildrenInput.value;
    const foreignAdults = foreignAdultsInput.value;
    const foreignChildren = foreignChildrenInput.value;
    const adultGuide = adultGuideCheckbox.checked ? "Yes" : "No";
    const kidGuide = kidGuideCheckbox.checked ? "Yes" : "No";
    const advTotalCost = document.getElementById('advbookingOutput').innerText;

    // Insert data into the adventure booking table
    const advlist = document.getElementById('advlist');
    const newAdvRow = advlist.insertRow(-1);
    newAdvRow.innerHTML = `<td>${fname} ${lname}</td>
                           <td>${advType}</td>
                           <td>${localAdults}</td>
                           <td>${localChildren}</td>
                           <td>${foreignAdults}</td>
                           <td>${foreignChildren}</td>
                           <td>${adultGuide}</td>
                           <td>${kidGuide}</td>
                           <td>${advTotalCost}</td>`;

    // Reset adventure form fields
    document.getElementById('advType').value = 'none';
    document.getElementById('advbookingOutput').innerText = "LKR 0.00";
    document.getElementById('adultGuide').checked = false;
    document.getElementById('kidGuide').checked = false;
}

// Function to check and display loyalty points
function updateLoyaltyPoints() {
    // Retrieve the number of rooms from the order
    const singleRoomQty = parseInt(singleRoomsInput.value) || 0;
    const doubleRoomQty = parseInt(doubleRoomsInput.value) || 0;
    const tripleRoomQty = parseInt(tripleRoomsInput.value) || 0;

    const totalRooms = singleRoomQty + doubleRoomQty + tripleRoomQty;
    let loyaltyPoints;

    // Check if the number of rooms is greater than 3
    if (totalRooms > 3) {
        // Award 20 loyalty points per room
        loyaltyPoints = totalRooms * 20;

        // Store the loyalty points in local storage
        localStorage.setItem("loyaltyPoints", loyaltyPoints);
    }  
}

// Function to initialize loyalty points on page load
function checkLoyaltyPoints() {
    // Retrieve loyalty points from local storage
    const storedLoyaltyPoints = localStorage.getItem("loyaltyPoints");

    // Display loyalty points to the user if available
    if (storedLoyaltyPoints) {
        loyaltyField.textContent = `${storedLoyaltyPoints} Points`;
    }
}

function saveRoomFav(){
    const roomBooking = {
        checkInDate: checkInInput.value,
        checkOutDate: checkOutInput.value,
        singleRooms: singleRoomsInput.value || 0,
        doubleRooms: doubleRoomsInput.value || 0,
        tripleRooms: tripleRoomsInput.value || 0,
        adults: noAdultsInput.value || 0,
        children: noChildrenInput.value || 0,
        mealsOver5: mealsKidsInput.value || 0,
        wifi: wifiCheckbox.checked ? 'Yes' : 'No',
        extraBed: extraBedCheckbox.checked ? 'Yes' : 'No',
        poolView: poolViewCheckbox.checked ? 'Yes' : 'No',
        gardenView: gardenViewCheckbox.checked ? 'Yes' : 'No',
        promoCode: promoCodeInput.value,
    }
    alert("Your choices for rooms have been favourited!");
    localStorage.setItem('favouriteRoomBooking', JSON.stringify(roomBooking));
};

function saveAdvFav(){
    const advBooking = {
        localAdults: localAdultsInput.value || 0,
        localChildren: localChildrenInput.value || 0,
        foreignAdults: foreignAdultsInput.value || 0,
        foreignChildren: foreignChildrenInput.value || 0,
        adultGuide: adultGuideCheckbox.checked ? 'Yes' : 'No',
        kidGuide: kidGuideCheckbox.checked ? 'Yes' : 'No',
       
    }
    alert("Your choices for adventure have been favourited!");
    localStorage.setItem('favouriteAdvBooking', JSON.stringify(advBooking));
};

function validateRoomBooking() {
    // Personal Details
    const fname = fnameInput.value.trim();
    const lname = lnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const country = countryInput.value.trim();

    // Booking Details
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const noAdults = noAdultsInput.value;
    const singleRooms = singleRoomsInput.value;
    const doubleRooms = doubleRoomsInput.value;
    const tripleRooms = tripleRoomsInput.value;

    // Validation logic
    if (!fname || !lname || !email || !phone || !country ||
        !checkIn || !checkOut || !noAdults || !(singleRooms || doubleRooms || tripleRooms)) {
        alert('Please fill in all required fields for Room Booking.');
        return false;
    }

    return true;
}

function validateAdventureBooking() {
    // Personal Details
    const fname = fnameInput.value.trim();
    const lname = lnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const country = countryInput.value.trim();

    // Adventure Booking
    const localAdults = localAdultsInput.value;
    const localChildren = localChildrenInput.value;
    const foreignAdults = foreignAdultsInput.value;
    const foreignChildren = foreignChildrenInput.value;
    const advType = advTypeSelect.value;

    // Validation logic
    if (!fname || !lname || !email || !phone || !country ||
        !(localAdults || localChildren || foreignAdults || foreignChildren) || advType === 'none') {
        alert('Please fill in all required fields for Adventure Booking.');
        return false;
    }

    return true;
}
