//左右移动
{
    let xiangmu=document.querySelector(".xiangmu");
    let inner=document.querySelector(".inner");
    let prev=document.querySelector(".btnl");
    let next=document.querySelector(".btnr");
    let n=1;
    let flag=true;
    prev.onclick=function(){
        if(flag){
            flag=false;
            n--;
            inner.style.transition="all 0.5s";
            inner.style.marginLeft=-1200*n+"px";
        }


    }
    next.onclick=function(){
        if(flag){
            flag=false;
            n++;
            inner.style.transition="all 0.5s";
            inner.style.marginLeft=-1200*n+"px";
        }

    }
    inner.addEventListener("transitionend",function(){
        flag=true;
        if(n===4){
            inner.style.transition="none"
            inner.style.marginLeft="-1200px";
            n=1;
        }
        if(n===0){
            inner.style.transition="none";
            inner.style.marginLeft="-3600px";
            n=3;
        }
    })
}
//漂浮物
{
    let docf=document.createDocumentFragment();
    // let arr=["html","css","node","javaScript","css","vue","nodejs","php",
    //     "mysql","bootstrap","express","antd"];
    let arr=[" "," "," "," "," "," "," "," "," "," "," "," "," "];
    let colorArr=["c","6","9","F"];
    function getcolor(){
        let str="#";
        for(let i=0;i<3;i++){
            str+=colorArr[Math.floor(Math.random()*colorArr.length)]
        }
        return str;
    }
    function checkPos(l,t){
        return pos.some(function(p){

            if(l>p.l-100&&l<p.l+100&&t>p.t-100&&t<p.t+100){
                return true;
            }
        });

    }
    let pos=[];
    let divarr=arr.map(function(val,index){
        let newdiv=document.createElement("div");
        let randomLeft,randomTop;
        do{
            randomLeft=(window.innerWidth-100)*Math.random();
            randomTop=(window.innerHeight-100)*Math.random();

        }while(checkPos(randomLeft,randomTop));
        pos.push({l:randomLeft,t:randomTop,speed:2+Math.random()*10});
        newdiv.innerHTML=val;
        newdiv.style.cssText=`width:100px;height:100px;border-radius:50%;
        position:absolute;left:${randomLeft}px;top:${randomTop}px;
        text-align:center;line-height:50px;
        font-size:16px;background:${getcolor()};opactity:0;`
        docf.appendChild(newdiv);
        return newdiv;

    })
    let scene=document.querySelector(".sence");
    scene.appendChild(docf);
    setInterval(function(){
        divarr.forEach(function(ele,index){
            if(index<pos.length/2){
                pos[index].l+=pos[index].speed;
                if(pos[index].l>window.innerWidth-100||pos[index].l<0){
                    pos[index].speed*=-1;
                }
                ele.style.left=pos[index].l+"px";
            }else{
                pos[index].t+=pos[index].speed;
                if(pos[index].t>window.innerWidth-100||pos[index].t<0){
                    pos[index].speed*=-1;
                }
                ele.style.top=pos[index].t+"px";
            }
        })
    },50)

}
//头像
{
    let menu=document.querySelector(".touxiang");
    let items=document.querySelectorAll(".nav_item");
    const R=90;
    let n=1;
    menu.onclick=function () {

        n++;
        if(n%2===0){
            items.forEach(function(ele,index){
                let angle=index*Math.PI/3;
                let x=R*Math.cos(angle);
                let y=R*Math.sin(angle);
                ele.style.left=x+"px";
                ele.style.top=y+"px";
                ele.style.transform="scale(1,1)";
                ele.style.zIndex="20";
            });
        }
        else{
            items.forEach(function(ele,index){
                ele.style.left="10px";
                ele.style.top="10px";
                ele.style.right="10px";
                ele.style.bottom="10px";
                ele.style.transform="scale(0.1,0.1)";
                ele.style.zIndex="-1";
            });
        }


    }
}
//留言
{
    let  textarea=document.querySelector(".liuyan");
    let now=document.querySelector("#now");
    let submit=document.querySelector(".submit");
    let showarea=document.querySelector(".message_show");
    textarea.onkeyup=count;
    textarea.onkeydown=count;
    submit.onclick=submithandler;
    function count(){
        let val=this.value;
        let length=val.length;
        if(length>40){
            length=40;
            this.value=val.slice(0,40);
        }
        now.innerHTML=length;
    }

    function getData(){
        return localStorage.message ? JSON.parse(localStorage.message) : [];
    }
    function  saveData(data){
        localStorage.message=JSON.stringify(data);

    }
    function render() {
        let data=getData();
        showarea.innerHTML ="<h3>show</h3>";
        data.forEach(function(val,index){
            let p=document.createElement("p");
            p.innerHTML=val+"<i id="+index+">删除</i>";
            showarea.appendChild(p);
        })
    }

    render();


    function submithandler(){
        let val=textarea.value;
        if(val===""){
            alert("请输入内容")
            return;
        }
        textarea.value="";
        now.innerHTML="0";
        let data=getData();
        data.push(val);

        saveData(data);
        render();
    }
    document.onkeydown=function(e){
        if(e.ctrlKey&&e.keyCode===13){
            submithandler();
        }

    }
    showarea.onclick=function(e){
        let target=e.target;
        if(target.nodeName=="I"){
            if(confirm("确定要删除")) {

                let data = getData();
                let index = target.id;
                data.splice(index, 1);
                saveData(data);
                render();
            }
        }
    }
}
//3d 转换
{
	var swiper = new Swiper('.swiper-container', {
		effect: 'cube',
		grabCursor: true,
		cubeEffect: {
			shadow: true,
			slideShadows: true,
			shadowOffset: 20,
			shadowScale: 0.94,
		},
		pagination: {
			el: ".swiper-pagination",
		},
	});

}