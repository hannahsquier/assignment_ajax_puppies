function Puppy(name, breed, created_at) {
  this.name = name;
  this.breed = breed;
  this.created_at = created_at;
}

var model = {
  init: function() {
    this.puppies = [];
  },

  addPuppyToList: function(puppyName, puppyBreed, created_at) {
    model.puppies.push(new Puppy(puppyName, puppyBreed, created_at));
  },

  createPuppyList: function(response) {
    for(var puppy in response) {
      model.addPuppyToList(response[puppy].name, response[puppy].breed.name, response[puppy].created_at);
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

  render: function(puppyList) {
    $list = $('#puppy-list');
    var now = new Date();

    for (var puppy in puppyList) {
      var creationDate = new Date(puppyList[puppy].created_at);
      $newli = $('<li></li>')
        .text(puppyList[puppy].name + " (" + puppyList[puppy].breed + "), created " + ((now - creationDate) / 1000 / 60)  + " minutes ago.");
      $list.append( $newli );
    }
  }
};

var API = {
  getPuppyList: function() {
    var puppyPromise =  $.ajax({ url: "https://ajax-puppies.herokuapp.com/puppies.json",
                                success: function(response) { 
                                  model.createPuppyList(response); 
                                  view.render(model.puppies);
                                } 
                              });

    return puppyPromise;
  }

  sendPuppy: function(puppy) {
    
    options = {
      url: 'https://ajax-puppies.herokuapp.com/puppies.json',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      data: JSON.stringify(puppy);

    }

    var puppyPromise = 
  };


};

$(document).ready(function() {
  controller.init();

  console.log(API.getPuppyList())
  console.log(model.puppies)
})