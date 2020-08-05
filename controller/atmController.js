const mongoose = require('mongoose');
const User = require('../models/UserData');


const notes = new Array(1000, 500, 200, 100, 50, 20, 10);
let active = [];

exports.gethome= (req, res, next)=>{
    active.length=0;
    res.render("layouts/home",{
        viewTitle: "ATM Cash Withdraw",
    });
};

exports.getlogin= (req, res, next)=>{
    res.render("layouts/login",{
        viewTitle: "Details"
    })
};

exports.postData= (req, res, next) =>{
    const name = req.body.name;
    const amount = req.body.amount;
    User.findOne({name:name, amount:amount})
        .then(users =>{
            if(users)
            {
                return res.redirect('/login');
            }
            const userdata = new User({name:name,amount:amount});
            return userdata.save()
                .then(result =>{
                        res.redirect('/');
                })
                .catch( err => {console.log(err)});
            })
        .catch(err =>{console.log(err)});
};

exports.postcheck = (req, res, next)=>{
    const name = req.body.name;
    User.findOne({name})
        .then(user=>{
            if(!user)
            {
                return res.redirect('/');
            }
            return res.render('layouts/amount',{
                viewTitle: "Welcome",
                username: name
            })
        })
        .catch( err => {console.log(err)});
};

exports.postamount= (req, res, next) =>{
        const drawamount = req.body.drawamount;
        const username = req.body.username;
        User.findOne({name: username})
            .then(check =>{
                if(check.amount < drawamount)
                {
                    return res.render("layouts/AccountEmpty",{
                        viewTitle: "Account Empty",
                        amountleft: check.amount
                    });
                }
                return res.render('layouts/denomination',{
                    viewTitle: "Check For Method",
                    drawamount: drawamount,
                    username: username
                })
            })
            .catch( err => {console.log(err)});
};

exports.postwithoutden=(req, res, next) => {
    const drawamount = req.body.drawamount;
    let calnotes = drawamount;
    const username = req.body.username;
    User.findOne({name: username})
        .then(result =>{
            if(!result){
                return res.redirect('/denomination');
            }
            if(active.length === 0) {
                for (let i = 0; i < notes.length; i++) {
                    let numberOfnotes = (Math.floor(calnotes / notes[i]));
                    active.push([notes[i], numberOfnotes]);
                    calnotes = calnotes % notes[i];
                }
                let amountleft = result.amount - drawamount;
                result.amount = amountleft;

                return result.save()
                    .then(resu => {
                        return res.render('layouts/withoutden', {
                            viewTitle: "Denomination",
                            drawamount: drawamount,
                            username: username,
                            active: active,
                            amountleft: amountleft
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        })
        .catch( err => {console.log(err)});
};

exports.postwithden=(req, res, next) => {
    const denomamount= req.body.denomamount;
    const EditArrayList = [];
    for(let i=0;i<notes.length;i++)
    {
        if(notes[i]<=denomamount)
        {
            EditArrayList.push(notes[i]);
        }
    }
    const drawamount = req.body.drawamount;
    let calnotes = drawamount;
    const username = req.body.username;
    User.findOne({name: username})
        .then(result =>{
            if(!result){
                return res.redirect('/denomination');
            }
            if(active.length === 0)
            {
                for(let i=0;i<EditArrayList.length;i++)
                {
                    let numberOfnotes= (Math.floor(calnotes/EditArrayList[i]));
                    active.push([EditArrayList[i],numberOfnotes]);
                    calnotes = calnotes%EditArrayList[i];
                    // console.table(active);
                }
                const amountleft = result.amount - drawamount;
                result.amount = amountleft;
                return result.save()
                    .then(resu => {
                        return  res.render('layouts/withden',{
                            viewTitle: "Denomination",
                            drawamount: drawamount,
                            username: username,
                            active: active,
                            amountleft : amountleft
                        })
                    })
                    .catch( err => {console.log(err)});
            }


        })
        .catch( err => {console.log(err)});
};

exports.postfinish=(req, res, next)=>{
    const drawamount = req.body.drawamount;
    const username = req.body.username;
    const amountleft = req.body.amountleft;
    res.render("layouts/final",{
        viewTitle: "Transaction Details",
        drawamount: drawamount,
        amountleft: amountleft,
        username: username

    });
};
