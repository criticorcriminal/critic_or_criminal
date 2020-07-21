var current_q = 0; // Question index
var qdata =[];  // Current Question date
var score = 0;  
var num_right = 0;
var mute_sounds = false;



// Anwer Colors
var correct_color = '#00A000A0';
var incorrect_color = '#A00000A0';

// Timer Bar Settings
var init_time = 12000; // Time to answer a question
var tick_time = 50; // Speed to update bar
game_len = 10; // In number of questions
var init_barWidth = 376; // bar width (except now it is height as I made it vertical)
var green_pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEBgIApD5fRAAAAABJRU5ErkJggg=="
var red_pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="
var yellow_pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5/hPwAIAgL/4d1j8wAAAABJRU5ErkJggg=="

var cur_time = init_time; // a global so we can get's value when we want to score.

var ts = null; // A global scoring timer use for clue fading and countdown and scoring


setProperty('cover_bg', 'image', 'https://upload.wikimedia.org/wikipedia/en/b/bb/Trump_Baby_Balloon_at_protest_in_Parliament_Square.jpg');

// Load Questions
var Q_list_all =[{
		"id": 1,
		"Name": "Chris Collins",
		"Title": "Fmr Republican congressman from NY & 1st congressman to endorse then-candidate Trump in the 2016 election.",
		"Category": "Criminal",
		"Answer": "Collins pled guilty to charges related to securities fraud conspiracy and making false statements. He was sentenced to 26 months in prison.",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chris_Collins_official_photo.jpg/440px-Chris_Collins_official_photo.jpg",
		"Source1": "https://abcnews.go.com/Politics/trump-associates-prison-faced-criminal-charges/story?id=68358219",
		"Source2": "https://www.cnn.com/2020/01/17/politics/collins-sentencing/index.html"
	},{
		"id": 2,
		"Name": "Duncan Hunter",
		"Title": "Fmr Republican congressman from CA & 2nd congressman to endorse then-candidate Trump in the 2016 election.",
		"Category": "Criminal",
		"Answer": "Pled guilty to conspiring to misuse $250,000 of campaign funds for his personal expenses. He was sentenced to 11 months in prison for stealing campaign funds.",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/2019-05-01_fcm_0192re.jpg/440px-2019-05-01_fcm_0192re.jpg",
		"Source1": "https://abcnews.go.com/Politics/trump-associates-prison-faced-criminal-charges/story?id=68358219",
		"Source2": "https://www.nytimes.com/2020/03/17/us/duncan-hunter-sentencing.html"
	},{
		"id": 3,
		"Name": "Michael Cohen",
		"Title": "Former Trump personal attorney",
		"Category": "Both",
		"Answer": "Pled guilty to 8 count including: tax evasion, lying to a bank, campaign finance violations and lying to Congress. He was sentenced to three years in prison. In his subsequent opening statement to Congess Michael Cohen said: \"I know what Mr. Trump is. He is a racist. He is a conman. He is a cheat.\"",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Michael_Cohen_in_2019.png/440px-Michael_Cohen_in_2019.png",
		"Source1": "https://www.cnn.com/2018/12/12/politics/michael-cohen-sentencing/index.html",
		"Source2": "https://www.cnn.com/2019/02/27/politics/cohen-testimony-read/index.html"
	},{
		"id": 4,
		"Name": "Michael Flynn",
		"Title": "Former Trump national security adviser",
		"Category": "Criminal",
		"Answer": "Pled guilty to lying to the FBI",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Michael_T_Flynn.jpg/440px-Michael_T_Flynn.jpg",
		"Source1": "https://www.cnn.com/2019/11/15/politics/trump-associates-convicted-in-mueller-related-investigations/index.html"
	},{
		"id": 5,
		"Name": "Rick Gates",
		"Title": "Former Trump campaign official",
		"Category": "Criminal",
		"Answer": "Pled guilty to conspiracy against the US,  lying to the FBI",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Rick_Gates_at_2016_RNC.jpg/440px-Rick_Gates_at_2016_RNC.jpg",
		"Source1": "https://www.cnn.com/2019/11/15/politics/trump-associates-convicted-in-mueller-related-investigations/index.html"
	},{
		"id": 6,
		"Name": "Paul Manafort",
		"Title": "Former Trump campaign chairman",
		"Category": "Criminal",
		"Answer": "Convicted of conspiracy against the US, tax evasion, bank fraud, hiding foreign bank accounts, conspiracy to obstruct justice",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Paul_Manafort_-_15_June_2018_-_VOA_News_%28cropped%29.jpg/440px-Paul_Manafort_-_15_June_2018_-_VOA_News_%28cropped%29.jpg",
		"Source1": "https://www.cnn.com/2019/11/15/politics/trump-associates-convicted-in-mueller-related-investigations/index.html"
	},{
		"id": 7,
		"Name": "George Papadopoulos",
		"Title": "Former Trump campaign adviser",
		"Category": "Criminal",
		"Answer": "Convicted of lying to the FBI",
		"image": "https://www.gstatic.com/tv/thumb/persons/1268420/1268420_v9_aa.jpg",
		"Source1": "https://www.cnn.com/2019/11/15/politics/trump-associates-convicted-in-mueller-related-investigations/index.html"
	},{
		"id": 8,
		"Name": "Roger Stone",
		"Title": "Former Trump campaign adviser",
		"Category": "Criminal",
		"Answer": "Convicted of lying to Congress, obstruction of Congress, witness tampering",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Roger_Stone_in_february_2019.png/440px-Roger_Stone_in_february_2019.png",
		"Source1": "https://www.cnn.com/2019/11/15/politics/trump-associates-convicted-in-mueller-related-investigations/index.html"
	},{
		"id": 9,
		"Name": "James Mattis",
		"Title": "Former Defense Secretary",
		"Category": "Critic",
		"Answer": "He said Trump is \"the first president in my lifetime who does not try to unite the American people.\" Adding: \"Instead he tries to divide us. We are witnessing the consequences of three years of this deliberate effort. We are witnessing the consequences of three years without mature leadership.\" Finally adding \"We must reject and hold accountable those in office who would make a mockery of our Constitution.\"",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/James_Mattis_official_photo.jpg/440px-James_Mattis_official_photo.jpg",
		"Source1": "https://www.cnn.com/2020/06/03/politics/mattis-protests-statement/index.html"
	},{
		"id": 10,
		"Name": "Anthony Scaramucci",
		"Title": "Former White House communications director",
		"Category": "Critic",
		"Answer": "Anthony Scaramucci, in an interview with The Gaurdian said Trum \"stinks and he’s a racist\" continuing to call him a “very crazy”, “low life”, “full-blown racist”, “son of a bitch”, “maniacally narcissistic” and “off his rocker”. Later talking to Bloomberg he said Trump “has a chance here to really get humiliated, which I hope he will,” Adding, “The economy’s in shambles as a direct result of his decision making and the politicization of a health-care crisis. And so for all those reasons, he’s obviously incompetent and so we’ve got to seek his removal.”",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Anthony_Scaramucci_at_SALT_Conference_2016_%28cropped%29.jpg/440px-Anthony_Scaramucci_at_SALT_Conference_2016_%28cropped%29.jpg",
		"Source1": "https://www.theguardian.com/tv-and-radio/2020/jul/17/the-guy-stinks-and-hes-a-racist-anthony-scaramucci-on-donald-trump",
		"Source2": "https://www.bloomberg.com/news/articles/2020-07-16/scaramucci-seeks-end-of-trumpism-in-his-push-to-elect-biden?sref=PfOWmCjP"
	},{
		"id": 11,
		"Name": "Ty Cobb",
		"Title": "Former White House counsel",
		"Category": "Critic",
		"Answer": "Cobb said he did not think the special counsel's probe was a \"witch hunt,\" and that \"Bob Mueller is an American hero in my view.\"",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ty_Cobb_2019.jpg/440px-Ty_Cobb_2019.jpg",
		"Source1": "https://www.cnn.com/2018/10/22/politics/ty-cobb-cnn-citizen/index.html"
	},{
		"id": 12,
		"Name": "Kurt Volker",
		"Title": "Former US Special Representative for Ukraine",
		"Category": "Critic",
		"Answer": "Volker told BBC News that he thought it was a  'Mistake for Trump to hold Ukraine aid'  for political reasons.",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Kurt_Volker_U.S._State_Department.jpg/440px-Kurt_Volker_U.S._State_Department.jpg",
		"Source1": "https://www.bbc.com/news/av/world-us-canada-51393228/kurt-volker-mistake-for-trump-to-hold-ukraine-aid"
	},{
		"id": 13,
		"Name": "Omarosa Manigault Newman",
		"Title": "Former director of communications for the White House Office of Public Liaison",
		"Category": "Critic",
		"Answer": "In her book Unhinged, Newman writes, \"Donald Trump, who would attack civil rights icons and professional athletes, who would go after grieving black widows, who would say there were good people on both sides, who endorsed an accused child molester; Donald Trump, and his decisions and his behavior, was harming the country. I could no longer be a part of this madness.\"",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Omarosa_Manigault_by_Gage_Skidmore.jpg/440px-Omarosa_Manigault_by_Gage_Skidmore.jpg",
		"Source1": "https://www.cnn.com/2018/08/11/politics/omarosa-tell-all-white-house/index.html"
	},{
		"id": 14,
		"Name": "Cliff Sims",
		"Title": "Former special assistant to the President and director of White House Message Strategy",
		"Category": "Critic",
		"Answer": "In his book \"Team of Vipers,\" Sims claimed that Trump created an \"enemies list\" consisting of members of his own administration.",
		"image": "https://images-na.ssl-images-amazon.com/images/I/B1RTV6hs56S._US460_.jpg",
		"Source1": "https://www.cnn.com/2019/01/18/politics/team-of-vipers-book/index.html"
	},{
		"id": 15,
		"Name": "John Bolton",
		"Title": "Former White House national security adviser",
		"Category": "Critic",
		"Answer": "In Bolton's book \"The Room Where It Happened\" he writes that Trump was willing to intervene in criminal investigations \"to, in effect, give personal favours to dictators he liked.\" Dicusssing the G20 meeting with the Chinese President Xi , Trump \"stunningly, turned the conversation to the coming US presidential election [in 2020], alluding to China's economic capability and pleading with Xi to ensure he'd win.\" Bolton also writes that \"One highlight came when Xi said he wanted to work with Trump for six more years, and Trump replied that people were saying that the two-term constitutional limit on presidents should be repealed for him.\"",
		"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/John_R._Bolton_official_photo.jpg/440px-John_R._Bolton_official_photo.jpg",
		"Source1": "https://www.bbc.com/news/world-us-canada-53089609"
	}
]

    

// FUNCTIONS

// fisher yates shuffle
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function calc_bonus(t){
  return(Math.round((t/200)*(t/200)))
}

// Load a Question
function load_Q(qdata) {
  setScreen("QuestionScreen");
  setProperty("question_image", "image", qdata.image);
  // hideElement("Title");
  setProperty("Title", "text-color", rgb(0, 0, 0, 0)); 
  setProperty("Title", "text", qdata.Title); 
  // hideElement("Name");
  setProperty("Name", "text-color", rgb(0, 0, 0, 0)); 
  setProperty("Name", "text", qdata.Name);

  //Executes the callback function code every time 100 milliseconds has elapsed, until if statement executes stopTimedLoop 
  // var cur_time = init_time;
  var cur_barWidth = init_barWidth;
  cur_time = init_time;
  setProperty("timerBar", "image", green_pixel);
  ts = timedLoop(tick_time, function() {
    cur_time = cur_time - tick_time;
    perc_done = (cur_time/init_time)
    setProperty("Name", "text-color", rgb(0, 0, 0, 1.2- perc_done*1.5));
    setProperty("Name", "background-color", rgb(255, 255, 255, .9-((0.8*perc_done*perc_done)) ) );  
    setProperty("Title", "text-color", rgb(0, 0, 0, 1-(perc_done*perc_done) ));
    setProperty("Title", "background-color", rgb(255, 255, 255, .9-((0.8*perc_done*perc_done)) ) ); 
    setProperty("CurBonus", "text", calc_bonus(cur_time) );
    cur_barWidth = Math.round(init_barWidth*(cur_time/init_time));
    if (cur_time == 6000) {
        setProperty("timerBar", "image", yellow_pixel);
    } else if (cur_time == 2000){
      setProperty("timerBar", "image", red_pixel);
    }
      
    for (var i = 0; i < init_time/tick_time; i++) {
      setPosition("timerBar", 304, 376-cur_barWidth, 16, cur_barWidth);
    }

    if (cur_time===0) {
      stopTimedLoop();
      score_Q("NoAnswer", qdata);
    }
  });
}


// Handle / Score an Answer
function score_Q(user_a) {
  setScreen("AnswerScreen");
    if ((qdata.Category === user_a) || (qdata.Category === 'Both')){
      score = score + 1000 + calc_bonus(cur_time);
      num_right = num_right + 1;
      setProperty("Outcome", "text", "Correct!");
      setProperty("Outcome", "background-color", correct_color);

      if (mute_sounds) {
      } else {
        playSound("assets/category_male_voiceover/correct_male.mp3", false);
      }
    } else {
      score = score - 1000 
      setProperty("Outcome", "text", "Sorry!");
      setProperty("Outcome", "background-color", incorrect_color);
      if (mute_sounds) {
      } else {
        playSound("assets/category_male_voiceover/wrong_male.mp3", false);
      }
    }
  var a = 'a ';
  if (qdata.Category === 'Both') {
    a = '';
  }
  setProperty("label", "text", qdata.Name + ' is ' + a + qdata.Category + '.');

  setProperty("answer_image", "image", qdata.image);
  var source_str = ' Source: ' + qdata.Source1;
  if (typeof qdata.Source2 === 'undefined'){
    source_str = source_str;
  } else {
    source_str = source_str + ' Additional Source: ' + qdata.Source2;
  }
  setProperty("the_answer", "text", qdata.Answer);
  setProperty("RunningScore", "text", score);
  setProperty("RunningScore2", "text", score);
  setProperty("Sources", "text", source_str);

 }



function GameOver() {
  setScreen("scoreScreen");
  var playerLabel = '';
  if (score > 40000) {
    playerLabel = "OMG! I haven't seen submissions this fast since the Net Neutrality public comment period!";
  } else if (score > 30000) {
    playerLabel = "OMG, that was impressive! What do you do, edit clip reels for cable news shows?";
  } else if (score > 25000) {    
    playerLabel = "Are you a pollster or do you just work at fivethirtyeight.com?";
  } else if (score > 20000) {    
    playerLabel = "Politics are in your blood! You've got Kellyanne Conway's speed, with George Conway's Brain.";
  } else if (score > 15000) {    
    playerLabel = "Sheesh you're on fire, or did Donald stay on the tanning bed too long?";
  } else if (score > 12000) {
    playerLabel = "Well done! You're a political junkie!";
  } else if (score > 100000) {
      playerLabel = "Good work! You're paying attention.";
  } else if (score > 8000) {
      playerLabel = "You can hang, but I'm guessing you are not on a first name basis with your congressman?";
  } else if (score > 5000) {
      playerLabel = "Very solid effort, there's a lot going on.";
  } else if (score > 2000) {
      playerLabel = "I know you are trying, but there are a lot of people to keep track of...";
  } else if (score > 0) {
      playerLabel = "Umm... Maybe a little less Netflix and a little more news?";
  } else {
    playerLabel = "You have an encyclopedic current poltical knowledge, but it's a print edition of the Encylopdia from 2012.";
  }
      
  setProperty("Score", "text", score + " points with bonus!");
  setProperty("Right", "text", 'You got: ' + num_right + ' out of ' + game_len + ' correct!');
  setProperty("Prize", "text", playerLabel);
  if (mute_sounds) {
  } else {
    playSound("assets/category_instrumental/trumpet.mp3", false);
  }
}

function SaveAm() {
  setScreen("saveScreen");
  write('<ul><li><a href="https://vote.gov/">Register to vote!</a></li>');
  write('<ul><li><a href="https://www.usa.gov/election-office">Find My State or Local Election Office Website</a></li></ul>');
  write('<ul><li><a href="https://www.usa.gov/confirm-voter-registration">Confirm You are Registered to Vote</a></li></ul>');
  write('<ul><li><a href="https://www.ballotready.org/">Get information on every candidate and referendum, explained by BallotReady.org</a></li></ul>');
  write('<ul><li><a href="https://www.usvotefoundation.org/vote/voter-registration-absentee-voting.htm">Vote by Mail</a></li></ul>');
}

function playAgain() {
    Q_list_all = shuffle(Q_list_all);
    current_q = 0;
    qdata=Q_list_all[current_q];
    score = 0;
    num_right = 0;
    load_Q(qdata)
}

// Button Handlers
onEvent("startButton", "click", function(event) {
  Q_list_all = shuffle(Q_list_all);
  qdata=Q_list_all[0];
  load_Q(qdata);
});

onEvent("Criminal", "click", function(event) {
  clearTimeout(ts);
  score_Q("Criminal", qdata);
});

onEvent("Critic", "click", function(event) {
  clearTimeout(ts);
  score_Q("Critic", qdata);
});

onEvent("NextButton", "click", function(event) {
    current_q = current_q + 1;
  if (current_q < game_len) {
    qdata=Q_list_all[current_q];
    load_Q(qdata);
  } else {
    GameOver();
  }

});

onEvent("playAgainButton", "click", function(event) {
  playAgain()
});

onEvent("playAgainButton2", "click", function(event) {
  playAgain()
});

onEvent("SaveAmerica", "click", function(event) {
  SaveAm()
});

onEvent("SaveAmerica2", "click", function(event) {
  SaveAm()
  
});

onEvent("CreditsButton", "click", function(event) {
  setScreen("creditsScreen");
});



onEvent("mute", "change", function(event) {
  mute_sounds = getChecked("mute")
});
