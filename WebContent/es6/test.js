/**
 * Created by liq on 2017/8/22.
 */
const s=new Set();

[2,3,1,2,5].forEach(x=>s.add(x))

for(let m of s){
    console.log(m)
}
console.log(s.size)