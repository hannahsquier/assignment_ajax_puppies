function Puppy(name, breed) {
  this.name = name;
  this.breed = breed;
}

var model = {
  init: function() {
    this.puppies = [];
  },

  addPuppyToList: function(puppyName, puppyBreed) {

    model.puppies.push(new Puppy(puppyName, puppyBreed));
  },

  createPuppyList: function(response) {
    for(puppy in response) {
      model.addPuppyToList(response[puppy].name, response[puppy].breed)
    }
  }
};

var controller = {
  init: function() {
    view.submitButtonListener();
    model.init();
  },

  submitButtonHandler: function(e) {
    e.preventDefault();

    var puppyName = view.getPuppyName();
    var puppyBreed = view.getPuppyBreed();

    if(puppyName) {
      model.addPuppyToList(puppyName, puppyBreed);
    }
  }
};

var view = {

  submitButtonListener: function() {

    $("#submit-button").on("click", controller.submitButtonHandler)
  },

  getPuppyName: function() {
    return $("#puppy-name").val();
  },

  getPuppyBreed: function() {
    return $("select").val();
  },

  render: function() {

  }
};

var API = {
  getPuppyList: function() {
    var puppyPromise =  $.ajax({ url: "https://ajax-puppies.herokuapp.com/puppies.json",
                                success: function(response) { model.createPuppyList(response) } } )

   return puppyPromise
  }


};

$(document).ready(function() {
  controller.init();

  console.log(API.getPuppyList())
  console.log(model.puppies)
})