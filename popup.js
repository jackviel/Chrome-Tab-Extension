chrome.storage.sync.get("storedTabs", function(result)
{
    if (typeof(result.storedTabs) != "undefined"){
    for (let i = 0; i < result.storedTabs.length; i++){
      var a = document.createElement('a');
      a.setAttribute('href',result.storedTabs[i].url);
      a.setAttribute('target',"_blank")
      a.setAttribute('id',result.storedTabs[i].id)
      a.innerHTML = result.storedTabs[i].title  + '<br />';
    
      document.getElementsByTagName('body')[0].appendChild(a);
  }
 }
});

function closeAndSaveTabs() {
      chrome.tabs.query({
        active: false,               
        lastFocusedWindow: true     
    }, function(array_of_Tabs) {
      
        if (array_of_Tabs.length >= 1)
        {
        var tabArray = [];

        for (let i = 0; i < array_of_Tabs.length; i++) {

          tabArray[i] = array_of_Tabs[i];

            // close tab
            chrome.tabs.remove(array_of_Tabs[i].id);
        }
        var storageArray = [];

        chrome.storage.sync.get("storedTabs", function(result)
        {
          storageArray.push.apply(storageArray, result.storedTabs);
          storageArray.push.apply(storageArray, tabArray);

          chrome.storage.sync.set({"storedTabs": storageArray});
          if (typeof(result.storedTabs) != "undefined"){
            var storedTabsLength = result.storedTabs.length;
          }
          else{
            var storedTabsLength = 0;
          }
          if (typeof(storageArray) != "undefined"){
            var storageArrayLength = storageArray.length;
          }
          else{
            var storageArrayLength = 0;
          }
          for (let i = storedTabsLength; i < storageArrayLength; i++){
            var a = document.createElement('a');
            a.setAttribute('href',storageArray[i].url);
            a.setAttribute('target',"_blank")
            a.setAttribute('id',storageArray[i].id)
            a.innerHTML = storageArray[i].title + '<br />';
            
            document.getElementsByTagName('body')[0].appendChild(a);
        }
        });
      }
    });
  }

document.getElementById('clickme').addEventListener('click', closeAndSaveTabs);
