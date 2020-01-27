// Business Logic for AddressBook (this is its Constructor)
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

// new method called add.contact
AddressBook.prototype.addContact = function(contact) {
  // locates the address books contacts array by calling 'this.contacts'
  contact.id = this.assignId();
  // This creates an id property on a Contact object, and assigns it a unique ID, incrementing value before pushing it to the contacts array in AddressBook.
  this.contacts.push(contact);
  // It uses push() to add the Contact provided as an argument to the AddressBook's contacts array property.
}
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}
// ^^^This new method will increment the this.currentId property on the AddressBook object by 1 and return the updated value. This mimics a database by creating sequentially incrementing ID values which are never repeated (making them unique).
AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
       }
      }
    };
  return false;
}
// ^^^The method then loops through the AddressBook object's contacts array, checking each entry's id against the id provided to the findContact() method as an argument.When a match is found, the method returns the Contact object with that specific id.
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
   if (this.contacts[i]) {
    if (this.contacts[i].id == id) {
      delete this.contacts[i];
      return true;
      }
    }
  };
  return false;
}
// ^^^^It deletes the contact with a matching ID and then returns true because the operation was completed. (If there's no record with a matching id to delete, it returns false.)

// Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  Contact.prototype.fullName = function() {
      return this.firstName + " " + this.lastName;
    }


// User Interface Logic

var addressBook = new AddressBook();
// this is a global variable because it's declared at the 'top level' of our file.



function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  // First we save our jQuery ul#contacts element in a variable called contactsList. This is best practice because it takes jQuery time to query the DOM and find ul#contacts. Saving it in a variable prevents it from later querying the DOM again, if we eventually use the selector multiple times. This is much more efficient.
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName +  " " + contact.phoneNumber + "</li>";
    // ^^^^We assign each Contact to a <li> with a dynamic id matching the Contact's id property. This is very important, because we can later retrieve this id stored in the <li> to use with our findContact() prototype method to locate an entire Contact object. We could've appended each Contact to the DOM one at a time, but that's inefficient. It's much faster to concatenate all Contacts inside <li>s first, then add them to the DOM in a single .html() call, like we do here.


  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    // First we call jQuery's on() method upon the parent element that we want to attach the event listener to. In this case, ul#contacts. on() takes two arguments:
// The first is the type of the event we're listening for. In our case, we want code to trigger when <li>s are clicked, but we could specify other events like hover or keyup as well.
// The second is the child element that should trigger this event listener. In this case, it's all <li>s inside ul#contacts.
// If we load our page, populate a few contacts with our form, and click their <li>s, we'll see the id of the clicked <li> logged in the console!
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").fadeOut();
    displayContactDetails(addressBook);
  });
};
$(document).ready(function(){
  attachContactListeners();
  // We'll then call ^this function as soon as the document is ready:
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    // ^^^^^^Let's call this new method whenever we add a new Contact.
  })
})