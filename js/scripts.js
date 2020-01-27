// Contact.prototype.fullName = function() {
//     return this.firstName + " " + this.lastName;
// }

// var testContact = new Contact("Ada", "Lovelace", "5-3=555=1111");

// testContact.fullName();


// var pdx = { name: "Portland" };
// var sfo = { name: "San Francisco "};
// var sea = { name: "Seattle" };
// var cso = { name: "Aktau" };
// var dzn = { name: "Zhezkazgan" };

// var usa = { name: "United States of America", cities: [pdx, sfo, sea] };
// var kazakhstan = {name: "kazakhstan" cities [cso, dzn] };
// var uruguay = { name: "uruguay", cities: [] };

// usa.cities.forEach(function(fcity) {
//     console.log("lets go to " + city.name + "!");
// })


// Business-logic for Address book //
function AddressBook() {
    // "this." referes to the "contacts" of this Addressbook //
    this.contacts = []
    this.currentId = 0;
}

//Instantiate new method to add a contact //
// Locates the Addressbook's [] for contacts //
// Uses push() tp add the Contact provided //
AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId(); // counter to increment number of contacts added //
    this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.assignId.currentId;
}
// Business-logic for Contacts //
function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber; 
}

Contact.prototype.fullname = function() {
    return this.firstName + " " + this.lastName;
}
