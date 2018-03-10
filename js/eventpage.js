// Globala variabler
console.log('this should be printed');
const ticketMasterApiKey = 'wRf3oq4FeoxXWIEZTHBNeexx93wdN8Vq';
const googleApiKey2 = 'AIzaSyDKH_D_sb0D4yfJy5OwO-SZf5kAFDGX7vo';


// Initalize the page based on window location.
window.onload = function(){
console.log(chatMessageTimeStamp(1519755958554));
console.log(chatMessageTimeStamp(1516758062943));
//printMessage('error', 'Testprint', 200000); // Type, message, timer (antal millisekunder)
let user = localStorage.getItem('loggedInUser');


  // Turned off for debug purposes
  //document.getElementById('eventTitle').addEventListener('click', retrieveEventInfo);


}

function createEventListenersForBtns(eventid, url, onsale){
  let buyBtn = document.getElementById('eventDivButtons').children[0];

  let createMeetupBtn = document.getElementById('eventDivButtons').children[2];

  if(onsale){
    buyBtn.addEventListener('click', function(){
      window.open(url);
      console.log('Köp biljett hos Ticketmaster!');
    });
  } else {
    buyBtn.disabled = true;
    buyBtn.innerText = 'Inga biljetter finns';
    buyBtn.className = 'noTicketsBtn';
  }


  createMeetupBtn.addEventListener('click', function(){

    // Init the skapa meetup modal HERE
    toggleCreateMeetupModal();
    initSliderAndMoreShit();
    // Create meetup btn Function

  });

}

function retrieveMeetupInfo(eventDate){
  let eventID = getLocationInfo()[0];
  if(!eventID){
    console.log('Rip, no eventid somehow!');
  } else {
    advancedListenerThatUpdatesTheDomLikeABoss(eventID);

  // This one listens to new Meetups and posts them in the DOM!
    db.ref('meetups/'+eventID).on('child_added', function(snapshot){



      let eventID = getLocationInfo()[0];
      let obj = snapshot.val();
      let meetupKey = snapshot.key;
      //console.log('NYCKEL:', meetupKey);

      // Initalize the sick advancedListenerThatUpdatesTheDomLikeABoss HERE


      //console.log(obj);

      if(!meetupKey.includes('info')){
        // Skapa funktion här som lägger till ett meetupkort!
        let md = document.createElement('div');
        md.setAttribute('id', 'meetup-' + meetupKey);

        let meetupDivTitle = document.createElement('h2');
        meetupDivTitle.innerText = obj.name;

        let meetupDivDate = document.createElement('p');
        meetupDivDate.innerText = eventDate + ' - ' + obj.time;


        // Namn på skaparen av meetup och label med bild.

        let creatorDiv = document.createElement('div');
        creatorDiv.className = 'creatorDiv';
        let insideCreatorDiv = document.createElement('div');

        let creatorNameLabel = document.createElement('p');
        creatorNameLabel.innerText = 'Skapare';
        let creatorName = document.createElement('p');
        creatorName.innerText = obj.creator.fullname;


        insideCreatorDiv.appendChild(creatorNameLabel);
        insideCreatorDiv.appendChild(creatorName);

        // ProfilbildsURL
        let creatorAvatarURL = document.createElement('img');
        creatorAvatarURL.setAttribute('alt', obj.creator.name + '\'s avatar.');
        creatorAvatarURL.setAttribute('src', obj.creator.avatarURL);
        creatorAvatarURL.className = 'avatar';

        creatorDiv.appendChild(creatorAvatarURL);
        creatorDiv.appendChild(insideCreatorDiv);

        // Skaparns mail
        let creatorMailDiv = document.createElement('div');
        creatorMailDiv.className = 'infoDiv';
        let creatorMailLabel = document.createElement('p');
        creatorMailLabel.innerText = 'Kontaktinformation';
        let creatorMail = document.createElement('p');
        creatorMail.innerText = obj.creator.mail;

        creatorMailDiv.appendChild(creatorMailLabel);
        creatorMailDiv.appendChild(creatorMail);


        //Deltagare + Åldersgräns wrapper
        let ageAntalWrapper = document.createElement('div');
        ageAntalWrapper.className = 'infoDivWrapper';

        // Deltagare

        let currentMembers = 0;

        for(let thisisnotused in obj.members){
          currentMembers++;
        }


        let antalDiv = document.createElement('div');
        antalDiv.className = 'infoDiv';

        let antalLabel = document.createElement('p');
        antalLabel.innerText = 'Deltagare';
        let antal = document.createElement('p');
        antal.innerText = currentMembers + ' / ' + obj.spots;



        antalDiv.appendChild(antalLabel);
        antalDiv.appendChild(antal);

        // Åldersgräns
        let ageDiv = document.createElement('div');
        ageDiv.className = 'infoDiv';

        let ageIntervalLabel = document.createElement('p');
        ageIntervalLabel.innerText = 'Åldersgräns';
        let ageInterval = document.createElement('p');
        ageInterval.innerText = obj.ageInterval[0] + ' - ' + obj.ageInterval[1];

        ageDiv.appendChild(ageIntervalLabel);
        ageDiv.appendChild(ageInterval);

        ageAntalWrapper.appendChild(ageDiv);
        ageAntalWrapper.appendChild(antalDiv);

        // Adress
        let addressDiv = document.createElement('div');
        addressDiv.className = 'infoDiv';

        let addressLabel = document.createElement('p');
        addressLabel.innerText = 'Adress';
        let address = document.createElement('p');
        address.innerText = obj.address;

        addressDiv.appendChild(addressLabel);
        addressDiv.appendChild(address);


        /* MAKE THE CARD HERE, PLACED RIGHT IN THE MEETUP */

        // Kort wrapper!
        let addressCard = document.createElement('div');
        addressCard.className = 'addressCard';

        // Plats
        let placeNameLabel = document.createElement('p');
        let placeName = document.createElement('p');
        placeNameLabel.innerText = 'Plats';
        placeName.innerText = obj.placeName;

        //Address!
        let cardAddressLabel = document.createElement('p');
        let cardAddress = document.createElement('p');
        cardAddress.innerText = obj.address;
        cardAddressLabel.innerText = 'Adress';

        let cardDateLabel = document.createElement('p');
        let cardDate = document.createElement('p');
        cardDateLabel.innerText = 'Datum & Tid';
        cardDate.innerText = eventDate + ' kl ' + obj.time;

        // Splice latitude and longitude
        let latitude = obj.latitude.substring(0,9);
        let longitude = obj.longitude.substring(0,9);
        //console.log('LATITUDE!!', latitude);
        //console.log('LONGITUDE!!', longitude);


        let googleMapDiv = document.createElement('div');
        let googleMap = document.createElement('img');
        googleMapDiv.className = 'googleMapDiv';
        googleMapDiv.setAttribute('lat', latitude);
        googleMapDiv.setAttribute('lng', longitude);
        // Just src
        googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);
        googleMap.setAttribute('zoom', '16');

        googleMap.addEventListener('click', function(){
          let currentZoom = googleMap.getAttribute('zoom');
          let newZoom = (currentZoom-0) + 1;
          googleMap.setAttribute('zoom', newZoom);
          googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${newZoom}&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);
        });
        googleMap.addEventListener('contextmenu', function(event){
          event.preventDefault();
          let currentZoom = googleMap.getAttribute('zoom');
          let newZoom = (currentZoom-0) - 1;
          googleMap.setAttribute('zoom', newZoom);
          googleMap.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${newZoom}&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);
        });

        // Data-src - Debug shit
        // googleMap.setAttribute('data-src', `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleApiKey2}`);

        googleMapDiv.appendChild(googleMap);

        //Append into the card:

        addressCard.appendChild(placeNameLabel);
        addressCard.appendChild(placeName);

        addressCard.appendChild(cardAddressLabel);
        addressCard.appendChild(cardAddress);

        addressCard.appendChild(cardDateLabel);
        addressCard.appendChild(cardDate);

        addressCard.appendChild(googleMapDiv);

        let infoDiv = document.createElement('div');
        infoDiv.className = 'meetupInfo';

        let infoTextLabel = document.createElement('p')
        infoTextLabel.innerText = 'Information';
        let infoText = document.createElement('p');
        infoText.innerText = obj.info;

        infoDiv.appendChild(infoTextLabel);
        infoDiv.appendChild(infoText);

        let meetupWrapper = document.getElementById('meetupWrapper');

        // Gå med knapp
        let btnDiv = document.createElement('div');
        btnDiv.className = 'btnHolder';
        let joinMeetupBtn = document.createElement('button');

        joinMeetupBtn.className = 'purple';
        joinMeetupBtn.innerText = 'Gå med i meetup';

        let editBtn = document.createElement('button');
        editBtn.className = 'editBtn purple doNotCloseThis';
        editBtn.innerHTML = 'Redigera Meetup';

        let editSmallBtn = document.createElement('button');
        editSmallBtn.className = 'editBtn iconBtn doNotCloseThis' ;
        editSmallBtn.innerHTML = '<i class="mdi mdi-dots-vertical"></i>';


        editBtn.addEventListener('click', function(event){
          toggleMeetupDropDown(event, meetupKey, eventID);
        });
        editSmallBtn.addEventListener('click', function(event){
          toggleMeetupDropDown(event, meetupKey, eventID);
        });

        btnDiv.appendChild(joinMeetupBtn);

        md.appendChild(meetupDivTitle);
        md.appendChild(meetupDivDate);
        md.appendChild(creatorDiv);
        md.appendChild(creatorMailDiv);
        md.appendChild(ageAntalWrapper);
        md.appendChild(addressDiv);
        md.appendChild(addressCard);
        md.appendChild(infoDiv);

        // Display button based on if the user is in the meetup or not.
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if(currentUser){
          // Skriva om denna så att vi kan kolla ifall personen är admin / ägare.
            let comingMembers = obj.members;
            let admins = obj.admins;
            console.log('The Admins of this meetup are: ' + admins);
              // Om det finns minst en medlem i meetupet. Vilket det alltid ska göra.
              if(comingMembers != null){
                console.log('Members coming to this Meetup: ',comingMembers);

                //Get dem admins first.
                let adminBool = false;
                for(let admin in admins){
                  if(admins[admin] == currentUser.uniqueID){
                    console.log('You are the effing admin man!');
                    adminBool = true;
                  } else {
                    console.log('No admin here.');
                  }
                }

                // Gå igenom användaregenskaperna under denna medlem
                let show = null;
                for(let user in comingMembers){
                  // Om användaren som är inloggad finns i detta meetup så sätter vi userIsInMeetup till true
                  if(comingMembers[user].uniqueID == currentUser.uniqueID){
                    show = true;
                  }
                }
                if(show){
                  if(adminBool){
                    console.log('You are admin!');
                    md.appendChild(editBtn);
                    md.appendChild(editSmallBtn);
                  }
                  displayMembersAndChat(md, meetupKey);
                } else {
                  md.appendChild(btnDiv);
                }
              } else {
                console.warn('Data is null for the members of this meeup!');
              }

        } else {
          md.appendChild(btnDiv);
          console.log('NO EFFING USER');
        }


        // Append MAINDIV (md)
        meetupWrapper.appendChild(md);

        // Create Eventlistener for the joinMeetupBtn
        joinBtnListener(joinMeetupBtn, meetupKey);
      }
    });
  }
}

// Funktion för att gå med i ett meetup!
function joinMeetup(user, meetupKey, eventID){

  // joinMeetup(currentUser.uniqueID, currentUser.avatarURL, currentUser.fullname, meetupKey, eventID);
  db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snap){

    let data = snap.val();
    let userIsNotComing = false;

    for(let comingUser in data){
      if(data[comingUser].uniqueID == user.uniqueID) {
        userIsNotComing = true;
      }
    }

    let userObject = {
      uniqueID: user.uniqueID,
      sid: user.sid,
      fullname: user.fullname,
      avatarURL: user.avatarURL,
      joined: firebase.database.ServerValue.TIMESTAMP
    }

    if(!userIsNotComing){
      db.ref('meetups/' + eventID + '/' + meetupKey + '/members').push(userObject);
      console.log('Vi la till dig i meetupet!');
      new SystemMessage(meetupKey, userObject.fullname + ' gick med i meetupet.').push();

      // Lägg till meetup i användarens profil.
      addUserMeetup(userObject.uniqueID,eventID, meetupKey);
    } else {
      console.log('Du är redan med i detta meetup! Något måste gått fel!');
    }
  });
}

// Denna funktion uppdaterar dom:en när det sker en ändring i databasen!
function advancedListenerThatUpdatesTheDomLikeABoss(eventID){

  db.ref('meetups/'+eventID).on('child_changed', function(snapshot){
    // DatabaseObject
    let meetup = snapshot.val();
    let meetupKey = snapshot.key;
    let currentUser = localStorage.getItem('loggedInUser');
    // Definiera dom-objektet.
    let meetupWrapper = document.getElementById('meetup-' + meetupKey);
    console.log(meetupWrapper);

    /* Börja med att kolla om meetpet finns kvar i databasen */
    if(meetupWrapper){
      //Uppdaterar titeln
      meetupWrapper.children[0].innerText = meetup.name;

      // Uppdaterar tid! - Splittar datumet för att kunna plocka bort tiden. Uppdaterar den sedan.
      let childOne = meetupWrapper.children[1];
      childOne.innerText = childOne.innerText.split(' - ')[0] + ' - ' + meetup.time;

      let creatorDiv = meetupWrapper.children[2];
      //Img of the user avatar
      creatorDiv.children[0].setAttribute('src', meetup.creator.avatarURL);

      // This is the path to the creator name displayed in the dom.
      creatorDiv.children[1].children[1].innerText = meetup.creator.fullname;

      let contactInfoDiv = meetupWrapper.children[3];
      contactInfoDiv.children[1].innerText = meetup.creator.mail;


      // Åldersgräns samt Deltagare
      let ageAndMembersDiv = meetupWrapper.children[4];
      ageAndMembersDiv.children[0].children[1].innerText = meetup.ageInterval[0] + ' - ' + meetup.ageInterval[1];

      // Count current members.
      let i = 0;
      for(let member in meetup.members){
        i++;
      }

      ageAndMembersDiv.children[1].children[1].innerText = i + ' / ' + meetup.spots;

      //Adressen
      let adressDiv = meetupWrapper.children[5];
      adressDiv.children[1].innerText = meetup.address;

      // Google map is meetupWrapper.children[6]


      let infoBox = meetupWrapper.children[7];
      infoBox.children[1].innerText = meetup.info;

      let memberOrButton = document.getElementsByClassName('moreMeetupInfoDiv ' + meetupKey)[0];
      if(!memberOrButton){
        memberOrButton = meetupWrapper.children[8];
      }

      // Display members and shit!
      if(!memberOrButton.className){
        console.log('It must be the btnHolder then?');

      } else if(memberOrButton.className.includes('moreMeetupInfoDiv')){
            // If the user that is logged in isn't in the meetup anymore. Hide this.
            let found = false;
            console.log('Members are displayed!');

            let membersWrapper = memberOrButton.children[0].children[1]; // Emptying the members list with this method: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
            while(membersWrapper.firstChild){
              membersWrapper.removeChild(membersWrapper.firstChild);
            }

            // Update the member list!
            for(let member in meetup.members){
              let user = meetup.members[member];
              if(currentUser.uniqueID == user.uniqueID) { found = true; }
              let memberDiv = document.createElement('div');
              memberDiv.className = 'memberDiv';

              let memberImage = document.createElement('img');
              memberImage.setAttribute('src', user.avatarURL);
              memberImage.setAttribute('sid', user.sid);
              memberImage.addEventListener('click', gotoProfile);

              let hoverMessage = document.createElement('p');
              hoverMessage.innerText = user.fullname;
              hoverMessage.className = 'hoverMessage';

              memberDiv.appendChild(memberImage);
              memberDiv.appendChild(hoverMessage);
              membersWrapper.appendChild(memberDiv);
            }
            let memberDiv = document.createElement('div');
            memberDiv.className = 'memberDiv';
            // let imageWrapper = document.createElement('div');
            // let plus = document.createElement('span');
            // plus.innerHTML = '<i class="mdi mdi-account-plus"></i>';
            let addMemberDiv = document.createElement('div');
            addMemberDiv.className = 'addMemberDiv';
            addMemberDiv.innerHTML = '<i class="mdi mdi-plus mdi-36px"></i>';
            addMemberDiv.addEventListener('click', inviteFriend);
            let hoverMessage = document.createElement('p');
            hoverMessage.innerText = 'Bjud in en vän!';
            hoverMessage.className = 'hoverMessage';

            // imageWrapper.appendChild(plus);
            // imageWrapper.appendChild(memberImage);
            memberDiv.appendChild(addMemberDiv);
            memberDiv.appendChild(hoverMessage);
            membersWrapper.appendChild(memberDiv);

        } else if(memberOrButton.className == 'btnHolder'){
            console.log('This is a button.'); // This most likely the btn to join the meetup.

            // Now check if the logged in user just got added to the database!
            for(let member in meetup.members){
              let userStr = localStorage.getItem('loggedInUser');
              let user = JSON.parse(userStr);
              if(user){
                if(user.uniqueID == meetup.members[member].uniqueID){
                  console.log('THIS PERSON JUST JOINED THIS MEETUP!!');
                  addEditBtns(meetupKey);
                  if(memberOrButton.parentNode){
                    memberOrButton.parentNode.removeChild(memberOrButton);
                  }
                  displayMembersAndChat(null, meetupKey);

                }
              } else {
                console.log('No user logged in!');
              }
            }
        }
    } else {
      console.log('It just got removed, sry!');
    }
  });
}

function displayMembersAndChat(md, meetupKey){
    let eventID = getLocationInfo()[0];

    if(md == null){
      md = document.getElementById('meetup-' + meetupKey);
    }


    // Börja med att skapa wrappern för allting som ska visas när man är med i ett meetup!
    let moreMeetupInfoDiv = document.createElement('div');
    moreMeetupInfoDiv.className = 'moreMeetupInfoDiv ' + meetupKey;

    // Visa medlemmar här nedan

    //Skapa wrappers för medlemmar + label samt, chatt + label + input
    let memberWrapperWithLabel = document.createElement('div');
    let chatWrapperWithLabel = document.createElement('div');
    chatWrapperWithLabel.className = 'chatWrapperWithLabel';
    // Skapa label för medlemmar
    let membersLabel = document.createElement('p');
    membersLabel.innerText = 'Personer som kommer';
    memberWrapperWithLabel.appendChild(membersLabel);

    // Loopa igenom och skapa användarna.
    let membersWrappingDiv = document.createElement('div');

    membersWrappingDiv.className = 'membersWrappingDiv';

    // Spara nuvarande användare i databaseUser.
    let joinedTime = null;
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snap){

      let data = snap.val();
      for(let comingUser in data){
        let user = data[comingUser];
        let memberDiv = document.createElement('div');
        memberDiv.className = 'memberDiv';

        let memberDivAvatar = document.createElement('img');
        memberDivAvatar.setAttribute('alt', 'User picture');
        memberDivAvatar.setAttribute('src', user.avatarURL);
        memberDivAvatar.setAttribute('sid', user.sid);
        memberDivAvatar.addEventListener('click', gotoProfile);

        let hoverMessage = document.createElement('p');
        hoverMessage.innerText = user.fullname;
        hoverMessage.className = 'hoverMessage';

        if(comingUser != 'creator'){
          if(data[comingUser].uniqueID == currentUser.uniqueID){
            console.log('This is the user right now! Set the joinedTime');
            joinedTime = data[comingUser].joined;
          } else {
            console.log('This is not the current user. This person joined the meetup at: ' + data[comingUser].joined);
          }
        } else {
          console.log('This is the creator.. No joined time here :/');
        }



        memberDiv.appendChild(memberDivAvatar);
        memberDiv.appendChild(hoverMessage);
        membersWrappingDiv.appendChild(memberDiv);
        memberWrapperWithLabel.appendChild(membersWrappingDiv);
      }

      let memberDiv = document.createElement('div');
      memberDiv.className = 'memberDiv';
      // let imageWrapper = document.createElement('div');
      // let plus = document.createElement('span');
      // plus.innerHTML = '<i class="mdi mdi-account-plus"></i>';
      let addMemberDiv = document.createElement('div');
      addMemberDiv.className = 'addMemberDiv';
      addMemberDiv.innerHTML = '<i class="mdi mdi-plus mdi-36px"></i>';
      addMemberDiv.addEventListener('click', inviteFriend);
      let hoverMessage = document.createElement('p');
      hoverMessage.innerText = 'Bjud in en vän!';
      hoverMessage.className = 'hoverMessage';

      // imageWrapper.appendChild(plus);
      // imageWrapper.appendChild(memberImage);
      memberDiv.appendChild(addMemberDiv);
      memberDiv.appendChild(hoverMessage);
      membersWrappingDiv.appendChild(memberDiv);

    });

    // Append the members inside a div into the wrapper.

    // Börja med att skapa label för chatten
    let chattLabel = document.createElement('p');
    chattLabel.innerText = 'Meetup Chatt';

    // Skapa wrapper för chatten
    let chattWrapperDiv = document.createElement('div');
    chattWrapperDiv.className = 'chattWrapperDiv';

    // Inputbox box
    let inputBox = document.createElement('input');
    inputBox.setAttribute('placeholder', 'Skriv ett meddelande');

    // Variables for the message
    let senderID = currentUser.uniqueID;
    let avatarURL = currentUser.avatarURL;

    // Add Eventlistener for the inputBox
    console.log('ADDING EVENTLISTENER FOR KEYPRESS');
    inputBox.addEventListener('keypress', createMessage);

    let noMessage = document.createElement('p');
    noMessage.innerText = 'Inga meddelanden ännu.';
    noMessage.className = 'noMessage';

    chattWrapperDiv.appendChild(noMessage);
    chattWrapperDiv.setAttribute('id', 'chat' + meetupKey);
    let first = true;

    // start listening to chat messages on this meetupKey
    listenToChat(chattWrapperDiv, meetupKey, joinedTime);
    // End of chat


    // Create leaveMeetupBtn if the user isn't the creator!
    let appendBtn = false;
    let leaveMeetupBtn = document.createElement('button');

    db.ref('meetups/' + eventID + '/' + meetupKey + '/creator').once('value', function(snapshot){
      let data = snapshot.val();
      console.log('Compare', currentUser.uniqueID, data.uniqueID);
      if(data.uniqueID == currentUser.uniqueID){
        console.log('Lets not show leave meetup button :)');
      } else {
        appendBtn = true;

        leaveMeetupBtn.innerText = 'Lämna meetup';
        leaveMeetupBtn.className = 'leaveMeetupBtn';

        leaveMeetupBtn.addEventListener('click', function(event){
          event.target.style.backgroundColor = '#444';
          leaveMeetup(meetupKey);
        });
      }
    });

    // Append the members and chat into the moreMeetupInfoDiv
    moreMeetupInfoDiv.appendChild(memberWrapperWithLabel);

    // Append label
    chatWrapperWithLabel.appendChild(chattLabel);

    //Append the chatt
    chatWrapperWithLabel.appendChild(chattWrapperDiv);

    //Append inputBox
    chatWrapperWithLabel.appendChild(inputBox);

    //Append chatWrapperWithLabel
    moreMeetupInfoDiv.appendChild(chatWrapperWithLabel);

    //Append leave meetup button if the User isn't the creator
    if(appendBtn) moreMeetupInfoDiv.appendChild(leaveMeetupBtn);

    //Append moreMeetupInfoDiv into the MAINDIV and listen for the leave event
    md.appendChild(moreMeetupInfoDiv);

    //Lägg till en lyssnare ifall någon lämnar detta meetup!
    restoreJoinBtn(meetupKey);
}

// Stop listenting to chat messages on this meetupKey
function stopListenToChat(meetupKey){
  db.ref('chats/' + meetupKey).off();
}

function createMessage(event){
  if(event.keyCode == 13){
    if(localStorage.getItem('loggedInUser')){
      updateTimeStamps();
      // Some easy checks.
      if(event.target.value == "" || event.target.value == undefined || event.target.value == " "){
        console.log('No message specified!');
      } else if(event.target.value.length < 3){
        console.log('Message too short!');
      } else if(event.target.value.length > 200){
        console.log('Message too long!');
      } else {
        // Send message to the database constructor(senderID, avatarURL, meetupID, fullname)
        let textmessage = event.target.value;
        let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        let md = event.target.parentNode.parentNode.parentNode; // Meetup Div
        let ms = md.getAttribute('id'); // meetup String

        let meetupKey = ms.replace('-', '&').split('&')[1]
        let eventID = getLocationInfo()[0];
        db.ref('meetups/' + eventID + '/' + meetupKey + '/creator').once('value', function(snapshot){
          let creator = snapshot.val();
          console.log('Creator is:', creator);

          if(creator.uniqueID == currentUser.uniqueID){
            creator = true;
          } else {
            creator = false;
          }
          let newMessage = new UserMessage(currentUser.uniqueID, currentUser.avatarURL, meetupKey, currentUser.fullname, textmessage, creator);
          newMessage.push();
        });




        let chattWrapperDiv = event.target.previousSibling;
        // Scroll to the bottom of the div we're typing the message into! From this: https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
        chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;
        let htmlScroll = document.getElementsByTagName('html')[0];

        // Clear Inputbox
        event.target.value = '';
      }
    } else {
      console.log('You are not logged in');
    }
  }
}

// Start to listen to chat messages on this meetupKey
function listenToChat(chattWrapperDiv, meetupKey, joinedTime){

    // Fire scroll event.
    let likeArray = [];
    let doScroll = true;
    let messageCounter = 0;
    let count = 25;

    chatMessagesChildAdded(count);

    function loadMoreMessages(event){
      // Check if we're at the top.
      if(event.target.scrollTop == 0 && event.target.scrollHeight > 1200){
        // If we are and the fire scroll is active:
        if(doScroll){
          // Disable scroll event. We activate it later.
          doScroll = false;

          // Remove old listener. (Stop listening to new messages)
          stopListenToChat(meetupKey);

          // console.log('Count: ', count);
          // console.log('MessageCount: ', messageCounter);

          // If the counter + 15 is greater than messageCounter we've reached the top!
          if(count <= messageCounter + 15){

            console.log(chattWrapperDiv.scrollHeight);
            let scrollToThis = chattWrapperDiv.scrollHeight
            console.log(chattWrapperDiv.scrollTop);
            // Start to listen to the chat again. This time add 25 to the counter.
            chatMessagesChildAdded(count += 25, true);
            //console.log('Count increased by 25! Currently displaying ' + messageCounter + ' messages');
            //chattWrapperDiv.className += ' smooth-scroll'
            setTimeout(function(){
              //Set a timeout to scroll down.
              chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight - scrollToThis;
              console.log(chattWrapperDiv.scrollHeight);
              console.log(chattWrapperDiv.scrollTop);
              //Reset the scroll
              doScroll = true;
            },180);
          } else {
            console.log('No more messages to display.');
            let noMoreMessages = document.createElement('p');
            noMoreMessages.innerText = 'Inga fler meddelanden.';
            noMoreMessages.className = 'noMessage';
            chattWrapperDiv.insertBefore(noMoreMessages,chattWrapperDiv.firstChild);
            chattWrapperDiv.removeEventListener('scroll', loadMoreMessages);
          }
        }
      }
    }

    chattWrapperDiv.addEventListener('scroll', loadMoreMessages);


  let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  // chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;
  let displayedMessages = [];
  let first = true;
  function chatMessagesChildAdded(count, scroll = false){

    messageCounter = 0;
    let firstInsert = true, insertBefore = null;
    db.ref('chats/' + meetupKey).limitToLast(count).on('child_added', function(snapshot){

      let chattWrapperDiv = document.getElementById('chat' + meetupKey);
      let message = snapshot.val();
      let messageKey = snapshot.key;
      let doNotAppend = false;

      // Should we display the message? If the message was made before the player joined we don't show it.
      if(joinedTime <= message.time || getAdmin(currentUser.uniqueID)){

        if(first){
          while(chattWrapperDiv.firstChild){
            chattWrapperDiv.removeChild(chattWrapperDiv.firstChild);
          }
          first = false;
        }
        if(displayedMessages.includes(messageKey)){
          //console.log('Stop code plox');
          doNotAppend = true;
        }

        // Create the message DIV to be printed on the DOM
        let messageDiv = document.createElement('div');
        messageDiv.className = 'chattMessageDiv';

        // Create the avatar picture
        let avatarImg = document.createElement('img');
        avatarImg.setAttribute('src', message.avatarURL);
        messageDiv.appendChild(avatarImg);

        // Create the timeStamp
        let timeStamp = document.createElement('p');
        timeStamp.innerText = chatMessageTimeStamp(message.time);
        timeStamp.setAttribute('timeStamp', message.time);
        timeStamp.className = 'timeStamp';

        // Create the fullname
        let fullname = document.createElement('p');
        fullname.innerText = message.fullname;

        //Create Icon hoverMessage
        let iconHoverMessage = document.createElement('span');


        // Here we got the fullname, hehe! append appropriate icons?
        if(message.system){
            fullname.innerHTML += '<i class="mdi mdi-wrench"></i>';
            iconHoverMessage.innerText = 'Systembot';
            iconHoverMessage.className = 'hoverMessage';
            fullname.appendChild(iconHoverMessage);
        } else if(getAdmin(message.sender)){
            fullname.innerHTML += '<i class="mdi mdi-verified"></i>';
            iconHoverMessage.innerText = 'Administratör';
            iconHoverMessage.className = 'hoverMessage';
            fullname.appendChild(iconHoverMessage);
        } else if(message.creator){
            fullname.innerHTML += '<i class="mdi mdi-approval"></i>';
            iconHoverMessage.innerText = 'Skapare';
            iconHoverMessage.className = 'hoverMessage';
            fullname.appendChild(iconHoverMessage);
          }

        // Then if the user is owner of the meetup append approval


        // Create the actual message
        let textmessage = document.createElement('p');
        textmessage.innerText = message.textmessage;

        // Create a div to hold name + timeStamp
        let messageWrapper = document.createElement('div');
        messageWrapper.className = 'messageWrapper';

        messageWrapper.appendChild(fullname);
        messageWrapper.appendChild(timeStamp);

        //Create textmessage wrapperDiv
        let textmessageWrapper = document.createElement('div');
        textmessageWrapper.className = 'textmessageWrapper';

        // Create Like Button and counter
        let likeCount = document.createElement('span');
        likeCount.className = 'likeCount ' + messageKey;
        let likeBtn = document.createElement('span');

        // If the current user has liked this message, put this as a filled heart already!
        db.ref('likes/' + meetupKey + '/' + messageKey  + '/' + currentUser.uniqueID).once('value', function(newShot){
          if(newShot.val()){
            likeBtn.innerHTML = '<i class="mdi mdi-heart"></i>';
          } else {
            likeBtn.innerHTML = '<i class="mdi mdi-heart-outline"></i>';
          }
        });


        // Add eventListener for the likeButton
          if(!likeArray.includes(messageKey)){
            likeListenerOn(meetupKey, messageKey);
            likeArray.push(messageKey);
          } else {
            //console.log('This btn has already a likeListenerOn');
          }

          likeBtn.addEventListener('click', function(event){
            if(likeBtn.innerHTML == '<i class="mdi mdi-heart-outline"></i>'){
              toggleLike(meetupKey, messageKey);
              likeBtn.innerHTML = '<i class="mdi mdi-heart"></i>';
              likeBtn.className += ' heartbeat';
            } else {
              toggleLike(meetupKey, messageKey);
              likeBtn.innerHTML = '<i class="mdi mdi-heart-outline"></i>';
              likeBtn.className = likeBtn.className.replace(' heartbeat', '');
            }
          });

        // Append it into the textmessageWrapper
        textmessageWrapper.appendChild(textmessage);
        textmessageWrapper.appendChild(likeCount);
        textmessageWrapper.appendChild(likeBtn);
        messageWrapper.appendChild(textmessageWrapper);

        // Append everything into the messageDiv
        messageDiv.appendChild(avatarImg);
        messageDiv.appendChild(messageWrapper);



        if(doNotAppend){
          //console.log('Not appending!');
        } else if(scroll && !insertBefore){
          // First insert!
          //console.log('Scroll is true!');
          insertBefore = chattWrapperDiv.firstChild;
          chattWrapperDiv.insertBefore(messageDiv, chattWrapperDiv.firstChild);
        } else if(insertBefore && !doNotAppend && scroll){
          //console.log('This one!');
          chattWrapperDiv.insertBefore(messageDiv, insertBefore);
        } else if(!scroll){
          //console.log('Appending normally, apparently scroll is false.');
          chattWrapperDiv.appendChild(messageDiv);
        }

          displayedMessages.push(messageKey);


        // To scroll down or not to scroll down. Only if there's a user message outputted and not the scroll.
        if(!scroll){
          chattWrapperDiv.scrollTop = chattWrapperDiv.scrollHeight;
        }
        messageCounter += 1;
      } else {
        console.log('Did not print message again.');
      }
    });
    setTimeout(function(){
      scroll = false;
      insertBefore = null;
    }, 500);
  }
}

// Denna funktion uppdaterar tiden på meddelanden!
function updateTimeStamps(){
  let timestamps = document.getElementsByClassName('timeStamp');

  // We should limit this to the latest 10-30 messages?, will create weird stuff later if noticed.
  for(let stamp of timestamps){
    let messageTime = stamp.getAttribute('timeStamp');
    stamp.innerText = chatMessageTimeStamp(messageTime);
  }
}

// Denna funktion lyssnar på ifall någonting plockas bort ur databasen!
function restoreJoinBtn(meetupKey){
  let eventid = getLocationInfo()[0];

  db.ref('meetups/'+eventid+'/'+meetupKey + '/members').on('child_removed', function(snapshot){
    let data = snapshot.val();
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log('This was removed: ',data);
    removeUserMeetup(data.uniqueID, eventid,  meetupKey);
        if(currentUser.uniqueID == data.uniqueID){
          // Alert('It was you who left!');
          let md = document.getElementById('meetup-'+meetupKey);
          stopListenToChat(meetupKey);

          // Remove the eventListener for inputBox here for this user. DEBUG CODE, Might be useful.
          // let inputBox = document.getElementById('chat'+meetupKey).nextSibling;
          // console.log(inputBox);
          //
          // inputBox.removeEventListener('keypress', createMessage);
          // inputBox.setAttribute('placeholder', 'You got kicked :(');

          // Remove the mainDiv and append a join btn!
          let moreMeetupInfoDiv = md.lastChild;
          md.lastChild.className += ' overlayAnimation';

          let inputBox = document.getElementById('chat' + meetupKey).nextSibling;
          inputBox.disabled = true;
          inputBox.style.backgroundColor = '#ABABAB';
          removeEditBtn(meetupKey);
          setTimeout(function(){
            md.removeChild(md.lastChild);

            // Gå med knapp
            let btnDiv = document.createElement('div');
            btnDiv.className = 'btnHolder';
            let joinMeetupBtn = document.createElement('button');

            joinMeetupBtn.className = 'purple';
            joinMeetupBtn.innerText = 'Gå med i meetup';

            btnDiv.appendChild(joinMeetupBtn);

            joinBtnListener(joinMeetupBtn, meetupKey);

            md.appendChild(btnDiv);
          },800);





        }
  });
}

// Lämna ett meetup!
function leaveMeetup(meetupKey){
  stopListenToChat(meetupKey);
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  let eventID = getLocationInfo()[0];

  db.ref('meetups/' + eventID + '/' + meetupKey + '/members').once('value', function(snapshot){
    let data = snapshot.val();
    let key = snapshot.key;

    for(let member in data) {
      if(user.uniqueID == data[member].uniqueID){
        if(member == 'creator'){
          console.log('Du kan inte lämna detta meetup då du har skapat det! Radera det istället.');
        } else {
          db.ref('meetups/' + eventID + '/' + meetupKey + '/members/'+member).remove();
          new SystemMessage(meetupKey, user.fullname + ' lämnade meetupet.').push();
          console.log('Raderade användaren ifrån meetupet i databasen?');
        }
      }
    }
  });

}

function displayEventInfo(event){

  let imgHolder = document.getElementById('imageHolder').children[0];
  imgHolder.style.background = 'url("'+event.imageURL+'")';
  imgHolder.style.backgroundRepeat =  'no-repeat';
  imgHolder.style.backgroundSize = 'cover';
  imgHolder.style.backgroundPosition = 'center';

  // Add google map!
  let googleMapImg = document.getElementById('imageHolder').children[1];
  let googleMapImgURL = `https://maps.googleapis.com/maps/api/staticmap?center=${event.address}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${event.address}&key=${googleApiKey2}`;
  googleMapImg.style.background = 'url("'+googleMapImgURL+'")';
  googleMapImg.style.backgroundRepeat =  'no-repeat';
  googleMapImg.style.backgroundSize = 'cover';
  googleMapImg.style.backgroundPosition = 'center';

  // Set the Date
  document.getElementById('eventDate').innerText = displayDate(event.date, event.weekDay, event.offsale);
  document.getElementById('eventTitle').innerText = event.name;
  console.log('Event is:',event);


  // Om platsen inte finns (Göteborg - Ullevi) så skriver vi bara ut staden.
  if(event.place == undefined){
    document.getElementById('eventPlace').innerText = event.city;
  } else {
    document.getElementById('eventPlace').innerText = event.place + ', ' + event.city;
  }

  retrieveMeetupInfo(event.date);
  //updateEventInfo(event.name, event.priceRange, event.currency, event.onsale);
}

function retrieveEventInfo(){
  console.log('HREF: '+window.location.pathname);
  if(window.location.pathname.includes('eventpage.html')){
    let eventid = getLocationInfo()[0];
    //console.log('EVENTID IS', eventid);

    if(eventid != undefined){
      // Start to listen if meetups gets removed.
      listenToRemovedMeetups();

      fetch(`https://app.ticketmaster.eu/mfxapi/v1/event/${eventid}?domain_id=sweden&apikey=${ticketMasterApiKey}`, null)
      .then(function(response){

        //console.log(response);
        return response.json();
      })
      .then(function(json){
        //console.log('EVENTOBJECT without formatting:',json);
          let latitude = 58, longitude = 15;
          let event = json;
          let imageURL = event.images[0].url;
          let venue = event.venue;
          let priceRanges = event.price_ranges;
          let address = venue.location.address;
          let date = event.localeventdate;
          let offsale = event.offsale.value;

          console.log('Date is: ', date);
          if(!date){
            date = event.date;
          }

          // createMarker(latitude, longitude);
          //console.log('ImageUrl', imageURL);

          let eventObject = new EventClass(eventid, event.name, date, venue.name, address.address, address.city, event.properties.seats_avail, event.properties.minimum_age_required, [priceRanges.including_ticket_fees.min, priceRanges.including_ticket_fees.max], event.currency, 'EventInformation', event.images[0].url, event.day_of_week, offsale);

          console.log('EVENTOBJECT: ',eventObject);

          // Eventet hittades, information visas!
          displayEventInfo(eventObject);

          // Skapa eventListeners för knapparna!
          createEventListenersForBtns(eventid, event.url, event.properties.seats_avail);

          pageLoaded();
      })
      .catch(function(error){
        console.log('Här skedde det ett fel! Försöker vi plocka fram något som inte skickas med?');
        console.log('Felmeddelande:',error);
      })
    }

  } else {
    console.log('This function should not run on this page.');
  }
}

// Denna funktion beräknar vad som ska visas som tid på varje chattmeddelande!
function chatMessageTimeStamp(timeStamp){
  let currTime = new Date().getTime();
  //console.log('Current time is: ', currTime);
  let difference = currTime - timeStamp;
  //console.log('Difference:', difference);
  let seconds = Math.floor((difference / 1000));
  let minutes = Math.floor((difference / 1000 / 60));
  let hours = Math.floor((difference / 1000 / 60 / 60));
  let days = Math.floor((difference / 1000 / 60 / 60 / 24));
  // console.log('Divided by 1000 then 60:', difference / 1000 / 60);
  // console.log('Current date: ', new Date(currTime));
  // console.log('Timestamp date:', new Date(timeStamp));
  //console.log(timeStamp);

  // console.log('Sekunder: ' + seconds);
  // console.log('Minuter: ' + minutes);
  // console.log('Timmar: ' + hours);

  if(days > 0){
    if(days == 1){
      return ' en dag sedan';
    } else {
      return days + ' dagar sedan';
    }
  } else if(hours > 0){
    if(hours == 1){
      return hours + ' timme sedan';
    } else {
      return hours + ' timmar sedan';
    }
  } else if(minutes > 0){
      if(minutes == 1){
        return minutes + ' minut sedan';
      } else {
        return minutes + ' minuter sedan';
      }
  } else if (seconds > 0){
      if(seconds == 1){
        return seconds + ' sekund sedan';
      } else {
        return seconds + ' sekunder sedan';
      }
  } else {
    return 'nu';
  }
}

//Funktion för att visa datumet lite finare :)
function displayDate(dateStr, weekDay, offsale){

  let date, time, year, month, day;

  if(!dateStr && offsale){
    dateStr = offsale;
  }

  // Make the checks
  if(dateStr.includes('T')){
    dateStr = dateStr.split('T');

    console.log('datestr: ',dateStr);
    time = dateStr[1];

    year = dateStr[0];
    month = dateStr[1];
    day = dateStr[2];

  } else {
    console.log('DateSTRING: ',dateStr);
    dateStr = dateStr.split('-');

    year = dateStr[0];
    month = dateStr[1];
    day = dateStr[2];

  }

  // Om tiden finns, plocka bort millisekunder samt Z
  if(time){
    time = time.substring(0, time.length-4);
  } else if(offsale){ // Annars försöker vi hämta tiden ifrån offsale datumet ifall det är samma dag. (Risky)
    date = offsale.split('T')[0];
    date = date.split('-');
    if(year == date[0] && month == date[1] && day == date[2]){
      console.log('It\'s the same day!');
      time = offsale.split('T')[1];
      time = time.substring(0, time.length-4);
    } else{
      console.log('Date:', date);
      console.log(year, month, day);
    }
  }

  // Ifall dagen / månaden börjar med 0 så plocka bort nollan!
  if(day){
    if(day.startsWith('0')){
      day = day.replace(0, '');
    }
    if(month.startsWith('0')){
      month = month.replace(0, '');
    }
  }


  console.log(date + ' - ' + time);
  if(weekDay){
    return weekDay + ', ' + day + '/' + month + ' kl ' + time;
  } else {
    return day + '/' + month + ' - ' + year + ' kl ' + time;
  }
}

// Denna funktion hämtar informationen ifrån window.location!
function getLocationInfo(){
  let href = window.location.href, stopcode = false;

    if(href.includes('?event')){
      href = href.split('?')[1];

      href = href.split('&');

    } else {
      console.warn('This page should only be reached with a event specified in the address field.');
      console.log('Om man ändå hamnar här kan vi redirecta till alla event / lägga en sökruta här');
      //window.location.href = 'events.html';
      stopcode = true;
    }


  let eventID = 0, meetupID = 0;

  // Innehåller platsen för många antal setters?
  if(!stopcode){
    if(href.length > 2 || href.length <= 0){
      console.warn('Invalid href!');
    } else {
        for(let loc of href){

          // Loopa igenom adressen!
          if(loc.includes('event')){

            // Om det är eventdelen av adressen ta fram eventID:et!
            eventID = loc.split('=')[1];
          } else {
            // Annars tar vi fram meetupID:et!
            meetupID = loc.split('=')[1];
          }
        }

        // Radera eventuella #
        eventID = eventID.replace('#', '');
        return [eventID, meetupID];
    }
  } else {
    return false;
  }
}

// Wikipedia api retriever
function updateEventInfo(eventName, priceRange, currency, onsale){

  fetch(`https://sv.wikipedia.org/w/api.php?action=opensearch&search=${eventName}&limit=1&format=json`)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(json){
    if(json[2].length === 0){
      let tickets = '';
      if(onsale){
        tickets = '<p>Biljetter finns för detta event finns!</p>';
      }
      document.getElementById('eventInfoText').innerHTML = `
      ${tickets}
      <p>Pris:</p>

      <span>${priceRange[0] + currency} - ${priceRange[1] + currency}</span>

      <p>Ingenting om detta event hittades på Wikipedia</p>`;
    } else {
      document.getElementById('eventInfoText').innerHTML = json[2].toString();
    }
    console.log(json);

  });
}

function toggleLike(meetupKey, messageKey){
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  db.ref('likes/' + meetupKey + '/' + messageKey).once('value', function(snapshot){
    let data = snapshot.val();
    if(data){
      let found = false;
      for(let uid in data){
        if(uid == user.uniqueID){
          db.ref('likes/'+ meetupKey + '/'+ messageKey + '/' + uid).remove();
          found = true;
          console.log('unlike');
        }
      }
      if(!found){
        db.ref('likes/'+ meetupKey + '/'+ messageKey + '/' + user.uniqueID ).set(true);
        console.log('like');
      }
    } else {
      db.ref('likes/'+ meetupKey + '/'+ messageKey + '/' + user.uniqueID ).set(true);
      console.log('like');
    }
  });
}

function likeListenerOn(meetupKey, messageKey){
  //Listen for likes
  db.ref('likes/' + meetupKey + '/'+ messageKey).on('child_added', function(){
    console.log('New like!');
    let likeCounters = document.getElementsByClassName('likeCount '+messageKey);
    for(let likeCount of likeCounters){
      console.log(likeCount);
      if(likeCount.innerText){
        likeCount.innerText = (likeCount.innerText - 0) + 1;
      } else {
        likeCount.innerText = 1;
      }
    }
  });
  //Listen for unlikes
  db.ref('likes/' + meetupKey + '/'+ messageKey).on('child_removed', function(){
    console.log('Someone unliked :(');

    let likeCounters = document.getElementsByClassName('likeCount '+messageKey);

    for(let likeCount of likeCounters){
      console.log(likeCount);
      if(likeCount.innerText != 1){
        likeCount.innerText = (likeCount.innerText - 0) - 1;
      } else if(likeCount.innerText == 1){
        likeCount.innerText = '';
      }
    }
  });
}

function joinBtnListener(joinMeetupBtn, meetupKey){

  joinMeetupBtn.addEventListener('click', function(event){
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let eventID = getLocationInfo()[0];

    if(currentUser){
      joinMeetup(currentUser, meetupKey, eventID);

    } else {
      console.log('Setup login modal here?');
      toggleLoginModal();
    }

    event.target.style.backgroundColor = '#606060';
    event.target.disabled = true;

  });
}

function pageLoaded(){

  let header = document.getElementById('navigation');
  header.className = header.className.replace('hidden', '');
  document.getElementById('imageHolder').className = '';
  document.getElementById('eventHolder').className = '';
  document.getElementsByClassName('footer-box hidden')[0].className = 'footer-box';
  if(document.getElementsByClassName('spinner')[0]){
    document.getElementsByClassName('spinner')[0].className = 'hidden';
  }
}

function addEditBtns(meetupKey){
  let meetup = document.getElementById('meetup-' + meetupKey);
  let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if(currentUser){
    //Check if the currentUser is admin or not first.
    db.ref('meetups/' + getLocationInfo()[0] + '/' + meetupKey + '/admins').once('value', function(snapshot){
      let admins = snapshot.val();
      let adminBool = false;
      console.log('The admins are: ', admins);

      for(let admin in admins){
        console.log('This is what we find: ', admins[admin])
        if(admins[admin] == currentUser.uniqueID){
          console.log('ALERT ALERT ADMIN FOUND!!');
          adminBool = true;
        } else {
          console.log(admins[admin] + ' vs ' + currentUser.uniqueID);
          console.log('No admin here.');
        }
      }

      if(meetup && adminBool){
        let editBtn = document.createElement('button');
        editBtn.className = 'editBtn purple';
        editBtn.innerHTML = 'Redigera Meetup';

        meetup.insertBefore(editBtn, meetup.lastChild);

        let editSmallBtn = document.createElement('button');
        editSmallBtn.className = 'editBtn iconBtn';
        editSmallBtn.innerHTML = '<i class="mdi mdi-dots-vertical"></i>';

        meetup.insertBefore(editSmallBtn, meetup.lastChild);

        editBtn.addEventListener('click', function(){
          editMeetup(meetupKey);
        });
        editSmallBtn.addEventListener('click', function(){
          editMeetup(meetupKey);
        });
      } else {
        console.log('You are not admin or the meetup was not found.');
      }

    });
  }
}

function editMeetup(meetupKey){
  console.log('This meetup wants to be edited!! :(', meetupKey);

  //Get the Dom meetup.
  let meetup = document.getElementById('meetup-'+meetupKey);

  // Check if it exsits.
  if(!meetup){
    console.log('This does not exist :o');
  } else {

  }
}

function removeEditBtn(meetupKey){


  if(meetupKey != null){
    let meetup = document.getElementById('meetup-' + meetupKey);
    for(let i = meetup.children.length-1; i >= 0; i--){
      let node = meetup.children[i];

      if(node.className == 'editBtn purple'){
        meetup.removeChild(node);
      } else if(node.className == 'editBtn iconBtn'){
        meetup.removeChild(node);
      }
    }
    //Remove all btns.
  } else {
    let array = document.getElementsByClassName('editBtn');

    for(let i = array.length-1; i >= 0; i--){
      let node = array[i];
      node.parentNode.removeChild(node);
    }
  }
}

// Funktion som lyssnar på när meetups tas bort ur databasen.
function listenToRemovedMeetups(){
    let eventID = getLocationInfo()[0];

    db.ref('meetups/'+eventID).on('child_removed', function(snapshot){
      let data = snapshot.val();
      let meetupKey = snapshot.key;

      // Remove the meetup from the database.
      removeMeetupEntirelyFromTheDatabase(eventID, data, meetupKey);

      // Remove the meetup from the DOM
      let meetup = document.getElementById('meetup-'+meetupKey);
      let wrapper = document.getElementById('meetupWrapper');

      if(meetup){
        let overlay = document.createElement('div');
        overlay.className = 'meetupOverlayRemoved';
        meetup.className += ' overlayAnimation';
        meetup.appendChild(overlay);

        // Scroll.
        let htmlScroll = document.getElementsByTagName('html')[0];
        let bodyScroll = document.getElementsByTagName('body')[0];
        // console.log('Window scrollHeight: ', window.scrollHeight);
        // console.log('bodyScroll scrollHeight: ', bodyScroll.scrollHeight);
        // console.log('html scrollHeight: ', htmlScroll.scrollHeight);
        // console.log('ClientHeight body:', bodyScroll.clientHeight);
        // console.log('ClientHeight html:', htmlScroll.clientHeight);
        // console.log('scrollTop html:', htmlScroll.scrollTop);
        // console.log('scrollTop body:', bodyScroll.scrollTop);

        // Only scroll if we're at the bottom of the page
        console.log('Height: ',document.documentElement.scrollHeight);
        if(wrapper.lastChild.getAttribute('id') == meetup.getAttribute('id')){

          if((htmlScroll.scrollHeight - htmlScroll.scrollTop) == htmlScroll.clientHeight) {
            console.log('htmlSrollheight: ', htmlScroll.scrollHeight);
            document.documentElement.className += ' smooth-scroll';
            document.documentElement.scrollTop -= wrapper.lastChild.scrollHeight
            //htmlScroll.scrollTop -= wrapper.lastChild.scrollHeight;
          }
        }


        setTimeout(function(){
          meetup.parentNode.removeChild(meetup);
        },1500);

        console.log('Successfully removed from the dom!');
      }

    });
}

// Ta bort meetupet ur databasen
function destroyMeetup(meetupKey, eventID){
  if(!eventID){
    eventID = getLocationInfo()[0];
  }

  console.log('Meetup with ID: '+meetupKey+' under eventID: '+eventID+'is being removed from the database...');
  db.ref('meetups/' +eventID+ '/' +meetupKey).remove();
}

// Tanken med denna funktion är att lägga till meetupets meetupKey på användarens profil under "meetups".
function addUserMeetup(userID, eventID, meetupKey){
  //console.log('Lägga till meetup på användarens profil kördes.');
  db.ref('users/' + userID + '/meetups/' + eventID + '/' + meetupKey).set(true);
}

// Ta bort meetups personen ska gå på ifrån profilen
function removeUserMeetup(userID, eventID, meetupKey){
  //console.log('Ta bort meetup från användarens profil kördes.');
  db.ref('users/' + userID + '/meetups/' + eventID + '/' +meetupKey).remove();
}

// Ta bort allting kring ett meetup i databasen.
function removeMeetupEntirelyFromTheDatabase(eventID, data, meetupKey){

  /* Some variables */
  let creator = data.creator;
  let members = data.members;

  /* Some logs */
  console.log('This meetup was removed entirely.', data);
  console.log('It had the key', meetupKey);

  /* Start by removing it from the user profile of the creator */
  db.ref('users/' + creator.uniqueID + '/createdMeetups/' + eventID + '/' + meetupKey).remove();

  /* Remove the likes */
  db.ref('likes/' + meetupKey).remove();

  /* Remove the chat for this meetup */
  db.ref('chats/' + meetupKey).remove();

  /* Remove the meetups from peoples user profiles.. */
  for(let member in members){
    /* Remove from the players profile */
    removeUserMeetup(members[member].uniqueID, meetupKey);
  }

  /* Decrease the meetupCounter */
  decreaseMeetupCount(eventID);

}

// Bjud in vänner till ett meetup!

function inviteFriend(event){
  printMessage('error', 'You cannot invite friends yet, sorry :(');
}

function gotoProfile(event){
  popupProfile(event);
}

function popupProfile(event){
  let localUser = JSON.parse(localStorage.getItem('loggedInUser'));
  let user = {
    sid: event.target.getAttribute('sid'),
    avatarURL: event.target.getAttribute('src'),
    fullname: event.target.nextSibling.innerText
  }
  if(user.sid == 'undefined'){
    user.sid = false;
  }

  let profileHolder = document.createElement('div');
  profileHolder.className = 'profileHolder fadein';

  let avatarImage = document.createElement('img');
  avatarImage.setAttribute('src', user.avatarURL);

  let nameAndSidHolder = document.createElement('div');
  let fullname = document.createElement('span');
  fullname.innerText = user.fullname;

  let sid = document.createElement('span');
  sid.innerText = '[' + user.sid + ']' ;

  let btnHolder = document.createElement('div');
  let gotoBtn = document.createElement('button');
  gotoBtn.innerText = 'Gå till profil';
  gotoBtn.className = 'doNotCloseThis';
  if(user.sid){
    gotoBtn.addEventListener('click', function(){
      //window.location.assign('profile.html?user=' + event.target.getAttribute('sid'));
      printMessage('default', 'Denna ska leda till användarens profil. SiteID: ' + user.sid);
    });
  } else {
    gotoBtn.className = 'disabledBtn doNotCloseThis';
  }


  let kickBtn = document.createElement('button');
  kickBtn.innerHTML = '<i class="mdi mdi-account-remove mdi-24px"></i>';
  kickBtn.addEventListener('click', function(){
    confirmRemoveMeetup(null, null, 'Vill du verkligen ta bort ' + user.fullname + ' ifrån meetupet?', 'Hell yeah', function(){
      printMessage('success', 'Du sparkade på riktigt ut ' + user.fullname + '. Skäms!');
    });
  });

  let addFriendBtn = document.createElement('button');
  addFriendBtn.innerText = 'Lägg till vän';
  addFriendBtn.className = 'doNotCloseThis';
  /* Some small checks */
  if(user.sid){
    if(localUser){
      if(localUser.sid == user.sid){
        addFriendBtn.className = 'disabledBtn doNotCloseThis';
      } else {
        addFriendBtn.addEventListener('click', function(){
          addFriend(sid);
        });
      }
    } else {
      printMessage('error', 'Du är inte inloggad :o');
    }
  } else {
    addFriendBtn.className = 'disabledBtn doNotCloseThis';
  }

  let closeBtn = document.createElement('span');
  closeBtn.innerHTML = '<i class="mdi mdi-close mdi-24px"></i>'
  closeBtn.className = 'closeBtn';

  closeBtn.addEventListener('click', function(event){
    profileHolder.parentNode.removeChild(profileHolder);
  })

  let nameAndBtnWrapper = document.createElement('div');

  /* Append Everything */
  btnHolder.appendChild(gotoBtn);
  btnHolder.appendChild(addFriendBtn);
  btnHolder.appendChild(kickBtn);

  nameAndSidHolder.appendChild(fullname);

  if(user.sid){ nameAndSidHolder.appendChild(sid); }
    else {nameAndSidHolder.className = 'noSid'; }
  nameAndSidHolder.appendChild(closeBtn);

  nameAndBtnWrapper.appendChild(nameAndSidHolder);
  nameAndBtnWrapper.appendChild(btnHolder);

  profileHolder.appendChild(avatarImage);
  profileHolder.appendChild(nameAndBtnWrapper);

  event.target.parentNode.appendChild(profileHolder);

  window.addEventListener('click', function(e){

    if(e.target.className != profileHolder && !e.target.className.includes('doNotCloseThis') && e.target.className != 'noSid'){
      if(e.target == event.target){
        if(document.getElementsByClassName('profileHolder').length >= 2){
          if(profileHolder.parentNode){
            profileHolder.parentNode.removeChild(profileHolder);
          }
        }
      } else if(profileHolder.parentNode){
        profileHolder.parentNode.removeChild(profileHolder);
      }
    }
  });
}

function addFriend(sid){
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  if(user){
    console.log('Adding a new friend :3');
    db.ref('users/' + user.uniqueID + '/friends').push(sid);
  } else {
    printMessage('error', 'Du är inte inloggad :o');
  }
}
