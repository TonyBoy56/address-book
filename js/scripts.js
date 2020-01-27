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

AddressBook.prototype.findContact = function(id) {
    for (var i=0; i < this.contacts.length; i++) {
        if (this.contacts[i].id == id) {
            return this.contacts[i];
        }
    };
    return false;
}

AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
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

var addressBook = new AddressBook();
var contact = new Contact("Ada", "Lovelace",  "503-555-0100");
var contact2 = new Contact("Grace", "hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);


