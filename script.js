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
    
  }
};

$(document).ready(function() {
  controller.init();
})