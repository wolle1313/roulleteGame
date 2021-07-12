const gameImg1 = document.querySelector(".imgWrap1");
const gameImg2 = document.querySelector(".imgWrap2");
const gameImg3 = document.querySelector(".imgWrap3");
const gameImg4 = document.querySelector(".imgWrap4");
const rate = document.querySelector(".rate");
const btnPlay = document.querySelector(".gameStart");
const currMoney = document.querySelector(".currentMoney");
const time = 400;
rate.value = 10;
shakes = 0;
class Rotates {
    constructor( ) {
        this.column1 = 2;
        this.column2 = 2;
        this.column3 = 2;
        this.column4 = 2;
        let _rotationCount1 = 0;
        let _rotationCount2 = 0;
        let _rotationCount3 = 0;
        let _rotationCount4 = 0;
        let _score1 = 1;
        let _score2 = 1;
        let _score3 = 1;
        let _score4 = 1;
        let _currentRotation1 = 0;
        let _currentRotation2 = 0;
        let _currentRotation3 = 0;
        let _currentRotation4 = 0;
        this.countDiff = (numb, prevNumb) => {
            if(numb == prevNumb) return 0;
            if (numb - 1 == prevNumb || numb == 1 && prevNumb == 4) return 1;
            if(numb + 2 == prevNumb || numb == 3 && prevNumb == 1 || numb == 4 && prevNumb == 2) return 2;
            if(numb + 1 == prevNumb || numb == 4 && prevNumb == 1) return 3;
        }
        this.choosenNumbers = () => {
            const previousScore1 = _score1;
            const previousScore2 = _score2;
            const previousScore3 = _score3;
            const previousScore4 = _score4;
            _score1 = Math.floor((Math.random()*4) + 1);
            _score2 = Math.floor((Math.random()*4) + 1);
            _score3 = Math.floor((Math.random()*4) + 1);
            _score4 = Math.floor((Math.random()*4) + 1);
            _rotationCount1 =  4 + this.countDiff(_score1, previousScore1);
            _rotationCount2 = 8 + this.countDiff(_score2, previousScore2);
            _rotationCount3 = 12 + this.countDiff(_score3, previousScore3);
            _rotationCount4 = 16 + this.countDiff(_score4, previousScore4);
        };
        this.showNumbers = () => {
            console.log(_rotationCount1);
            console.log(_rotationCount2);
            console.log(_rotationCount3);
            console.log(_rotationCount4);
        }
        this.showScores = () => {
            return [_score1, _score2, _score3, _score4]
        }
        this.curRotation1 = () => {
            return ++_currentRotation1;
        }
        this.curRotation2 = () => {
            return ++_currentRotation2;
        }
        this.curRotation3 = () => {
            return ++_currentRotation3;
        }
        this.curRotation4 = () => {
            return ++_currentRotation4;
        }
        this.rotation1 = () => {
            return _rotationCount1;
        }
        this.rotation2 = () => {
            return _rotationCount2;
        }
        this.rotation3 = () => {
            return _rotationCount3;
        }
        this.rotation4 = () => {
            return _rotationCount4;
        }
        this.callRotate1 = () => {
            gameImg1.classList.add("animationEl");
            setTimeout(imgChange, time, gameImg1, _rotationCount1, this.curRotation1, this.column1);
        }
        this.callRotate2 = () => {
            gameImg2.classList.add("animationEl");
            setTimeout(imgChange, time, gameImg2, _rotationCount2, this.curRotation2, this.column2);
        }
        this.callRotate3 = () => {
            gameImg3.classList.add("animationEl");
            setTimeout(imgChange, time, gameImg3, _rotationCount3, this.curRotation3, this.column3);
        }
        this.callRotate4 = () => {
            gameImg4.classList.add("animationEl");
            setTimeout(imgChange, time, gameImg4, _rotationCount4, this.curRotation4, this.column4);
        }
        this.clearGame = (money) => {
             _rotationCount1 = 0;
             _rotationCount2 = 0;
             _rotationCount3 = 0;
             _rotationCount4 = 0;
             _currentRotation1 = 0;
             _currentRotation2 = 0;
             _currentRotation3 = 0;
             _currentRotation4 = 0;
             playerWallet.winCheck();
            currMoney.textContent = money;
            rate.classList.remove("shake");
            btnPlay.disabled = false;
        }
        
    }
  
}
class Wallet {
    constructor(money = 500) {
        let _money = money;
        this.moneyFetch = () => _money;
        this.checkScore = () => {
           const bet = rate.value;
           const scores = game.showScores();
           _money -= bet;
           currMoney.textContent = _money;
           const filtered = scores.filter((score, index) =>   scores.indexOf(score) != index );
           if(scores[0] === scores[1] && scores[1] === scores[2] && scores[2] === scores[3]) {
              _money += bet * 3;
              return _money;
           };
            if(!filtered.length) {
               _money += bet * 10;
               return _money;
           }
        this.winCheck = () => {
            if(_money > 9999999) {
                alert("wygrana!!!");
                _money = 9999999;
            }
        }
        return _money;
        }
        this.checkMoney = (bet) => {
            if (!bet) {
                alert("Wpisz stawkę")
                return false;
            }
            else if (_money >= bet) {
                return true;
            }
           
            else {
                alert("Nie masz wystarczająco środków")
                return false;
            }
        }
    }
}
const playerWallet = new Wallet();
const game = new Rotates();

function imgChange(img, rotationNo, curRotation, currentPic) {
    switch(img) {
        case gameImg1: 
       currentPic = game.column1++;
       if(game.column1> 4) {
        game.column1 = 1;
    }
        break;
        case gameImg2: 
        currentPic = game.column2++;
        if(game.column2> 4) {
         game.column2 = 1;
     }
        break;
        case gameImg3: 
        currentPic = game.column3++;
        if(game.column3> 4) {
         game.column3 = 1;
     }
        break;
        case gameImg4: 
        currentPic =  game.column4++;
        if(game.column4> 4) {
         game.column4 = 1;
     }
        break;
        
    }
    if (currentPic === 1) {
        img.classList.remove("first", "second", "third", "fourth");
        img.classList.add("first");
    }
    if (currentPic ===  2) {
        img.classList.remove("first", "second", "third", "fourth");
        img.classList.add("second");
    }
    if (currentPic ===  3) {
        img.classList.remove("first", "second", "third", "fourth");
        img.classList.add("third");
    }
    if (currentPic ===  4) {
        img.classList.remove("first", "second", "third", "fourth");
        img.classList.add("fourth");
    }
    
    if (rotationNo <= curRotation()) {
        img.classList.remove("animationEl");
        return
    }
    else {
        setTimeout(imgChange, time, img, rotationNo, curRotation, currentPic)
    }
}

btnPlay.addEventListener('click', function() {
    if (playerWallet.checkMoney(rate.value)) {
        btnPlay.disabled = true;
    game.choosenNumbers();
   const money = playerWallet.checkScore();
    game.callRotate1();
    game.callRotate2();
    game.callRotate3();
    game.callRotate4();
    const endTime = (game.rotation4() + 2) * time;
    setTimeout(game.clearGame, endTime, money);
    }
})
currMoney.textContent = playerWallet.moneyFetch();
