import{r as u,j as b}from"./vendor_react-DBLym1_Z.js";import{a7 as M,a8 as T,a9 as S,aa as m,ab as p,ac as v,ad as g}from"./vendor-CioGdumB.js";function y(h,e){let t;return function(...s){t!==void 0&&window.clearTimeout(t),t=window.setTimeout(()=>h.apply(this,s),e)}}function z(h,e,t){return h+(e-h)*t}function O(h){const e=Object.getPrototypeOf(h);Object.getOwnPropertyNames(e).forEach(t=>{t!=="constructor"&&typeof h[t]=="function"&&(h[t]=h[t].bind(h))})}function E(h,e,t="bold 30px monospace",s="black"){const i=document.createElement("canvas"),n=i.getContext("2d");n.font=t;const a=n.measureText(e),o=Math.ceil(a.width),r=t.match(/(\d+)px/),c=r?parseInt(r[1],10):30,l=Math.ceil(c*1.2);i.width=o+20,i.height=l+20,n.font=t,n.fillStyle=s,n.textBaseline="middle",n.textAlign="center",n.clearRect(0,0,i.width,i.height),n.fillText(e,i.width/2,i.height/2);const d=new p(h,{generateMipmaps:!1});return d.image=i,{texture:d,width:i.width,height:i.height}}class R{constructor({gl:e,plane:t,renderer:s,text:i,textColor:n="#545050",font:a="30px sans-serif"}){O(this),this.gl=e,this.plane=t,this.renderer=s,this.text=i,this.textColor=n,this.font=a,this.createMesh()}createMesh(){const{texture:e,width:t,height:s}=E(this.gl,this.text,this.font,this.textColor),i=new m(this.gl),n=new v(this.gl,{vertex:`
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragment:`
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,uniforms:{tMap:{value:e}},transparent:!0});this.mesh=new g(this.gl,{geometry:i,program:n});const a=t/s,o=this.plane.scale.y*.15,r=o*a;this.mesh.scale.set(r,o,1),this.mesh.position.y=-this.plane.scale.y*.5-o*.5-.05,this.mesh.setParent(this.plane)}}class C{constructor({geometry:e,gl:t,image:s,index:i,length:n,renderer:a,scene:o,screen:r,text:c,viewport:l,bend:d,textColor:w,borderRadius:f=0,font:x}){this.extra=0,this.geometry=e,this.gl=t,this.image=s,this.index=i,this.length=n,this.renderer=a,this.scene=o,this.screen=r,this.text=c,this.viewport=l,this.bend=d,this.textColor=w,this.borderRadius=f,this.font=x,this.createShader(),this.createMesh(),this.createTitle(),this.onResize()}createShader(){const e=new p(this.gl,{generateMipmaps:!0});this.program=new v(this.gl,{depthTest:!1,depthWrite:!1,vertex:`
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,fragment:`
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          // Smooth antialiasing for edges
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,uniforms:{tMap:{value:e},uPlaneSizes:{value:[0,0]},uImageSizes:{value:[0,0]},uSpeed:{value:0},uTime:{value:100*Math.random()},uBorderRadius:{value:this.borderRadius}},transparent:!0});const t=new Image;t.crossOrigin="anonymous",t.src=this.image,t.onload=()=>{e.image=t,this.program.uniforms.uImageSizes.value=[t.naturalWidth,t.naturalHeight]}}createMesh(){this.plane=new g(this.gl,{geometry:this.geometry,program:this.program}),this.plane.setParent(this.scene)}createTitle(){this.title=new R({gl:this.gl,plane:this.plane,renderer:this.renderer,text:this.text,textColor:this.textColor,fontFamily:this.font})}update(e,t){this.plane.position.x=this.x-e.current-this.extra;const s=this.plane.position.x,i=this.viewport.width/2;if(this.bend===0)this.plane.position.y=0,this.plane.rotation.z=0;else{const o=Math.abs(this.bend),r=(i*i+o*o)/(2*o),c=Math.min(Math.abs(s),i),l=r-Math.sqrt(r*r-c*c);this.bend>0?(this.plane.position.y=-l,this.plane.rotation.z=-Math.sign(s)*Math.asin(c/r)):(this.plane.position.y=l,this.plane.rotation.z=Math.sign(s)*Math.asin(c/r))}this.speed=e.current-e.last,this.program.uniforms.uTime.value+=.04,this.program.uniforms.uSpeed.value=this.speed;const n=this.plane.scale.x/2,a=this.viewport.width/2;this.isBefore=this.plane.position.x+n<-a,this.isAfter=this.plane.position.x-n>a,t==="right"&&this.isBefore&&(this.extra-=this.widthTotal,this.isBefore=this.isAfter=!1),t==="left"&&this.isAfter&&(this.extra+=this.widthTotal,this.isBefore=this.isAfter=!1)}onResize({screen:e,viewport:t}={}){e&&(this.screen=e),t&&(this.viewport=t,this.plane.program.uniforms.uViewportSizes&&(this.plane.program.uniforms.uViewportSizes.value=[this.viewport.width,this.viewport.height])),this.scale=this.screen.height/1500,this.plane.scale.y=this.viewport.height*(900*this.scale)/this.screen.height,this.plane.scale.x=this.viewport.width*(700*this.scale)/this.screen.width,this.plane.program.uniforms.uPlaneSizes.value=[this.plane.scale.x,this.plane.scale.y],this.padding=2,this.width=this.plane.scale.x+this.padding,this.widthTotal=this.width*this.length,this.x=this.width*this.index}}class L{constructor(e,{items:t,bend:s,textColor:i="#ffffff",borderRadius:n=0,font:a="bold 30px Figtree",scrollSpeed:o=2,scrollEase:r=.05}={}){document.documentElement.classList.remove("no-js"),this.container=e,this.scrollSpeed=o,this.scroll={ease:r,current:0,target:0,last:0},this.onCheckDebounce=y(this.onCheck,200),this.createRenderer(),this.createCamera(),this.createScene(),this.onResize(),this.createGeometry(),this.createMedias(t,s,i,n,a),this.update(),this.addEventListeners()}createRenderer(){this.renderer=new M({alpha:!0,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,2)}),this.gl=this.renderer.gl,this.gl.clearColor(0,0,0,0),this.container.appendChild(this.gl.canvas)}createCamera(){this.camera=new T(this.gl),this.camera.fov=45,this.camera.position.z=20}createScene(){this.scene=new S}createGeometry(){this.planeGeometry=new m(this.gl,{heightSegments:50,widthSegments:100})}createMedias(e,t=1,s,i,n){const a=[{image:"/canoeapp_logo.png",text:"CanoeApp"},{image:"/logo.png",text:"ViraShop"},{image:"/bf.png",text:"Portfolio"},{image:"",text:"Courzio"}],o=e&&e.length?e:a;this.mediasImages=o.concat(o),this.medias=this.mediasImages.map((r,c)=>new C({geometry:this.planeGeometry,gl:this.gl,image:r.image,index:c,length:this.mediasImages.length,renderer:this.renderer,scene:this.scene,screen:this.screen,text:r.text,viewport:this.viewport,bend:t,textColor:s,borderRadius:i,font:n}))}onTouchDown(e){this.isDown=!0,this.scroll.position=this.scroll.current,this.start=e.touches?e.touches[0].clientX:e.clientX}onTouchMove(e){if(!this.isDown)return;const t=e.touches?e.touches[0].clientX:e.clientX,s=(this.start-t)*(this.scrollSpeed*.025);this.scroll.target=this.scroll.position+s}onTouchUp(){this.isDown=!1,this.onCheck()}onWheel(e){const t=e.deltaY||e.wheelDelta||e.detail;this.scroll.target+=(t>0?this.scrollSpeed:-this.scrollSpeed)*.2,this.onCheckDebounce()}onCheck(){if(!this.medias||!this.medias[0])return;const e=this.medias[0].width,t=Math.round(Math.abs(this.scroll.target)/e),s=e*t;this.scroll.target=this.scroll.target<0?-s:s}onResize(){this.screen={width:this.container.clientWidth,height:this.container.clientHeight},this.renderer.setSize(this.screen.width,this.screen.height),this.camera.perspective({aspect:this.screen.width/this.screen.height});const e=this.camera.fov*Math.PI/180,t=2*Math.tan(e/2)*this.camera.position.z,s=t*this.camera.aspect;this.viewport={width:s,height:t},this.medias&&this.medias.forEach(i=>i.onResize({screen:this.screen,viewport:this.viewport}))}update(){this.scroll.current=z(this.scroll.current,this.scroll.target,this.scroll.ease);const e=this.scroll.current>this.scroll.last?"right":"left";this.medias&&this.medias.forEach(t=>t.update(this.scroll,e)),this.renderer.render({scene:this.scene,camera:this.camera}),this.scroll.last=this.scroll.current,this.raf=window.requestAnimationFrame(this.update.bind(this))}addEventListeners(){this.boundOnResize=this.onResize.bind(this),this.boundOnWheel=this.onWheel.bind(this),this.boundOnTouchDown=this.onTouchDown.bind(this),this.boundOnTouchMove=this.onTouchMove.bind(this),this.boundOnTouchUp=this.onTouchUp.bind(this),window.addEventListener("resize",this.boundOnResize),window.addEventListener("mousewheel",this.boundOnWheel),window.addEventListener("wheel",this.boundOnWheel),window.addEventListener("mousedown",this.boundOnTouchDown),window.addEventListener("mousemove",this.boundOnTouchMove),window.addEventListener("mouseup",this.boundOnTouchUp),window.addEventListener("touchstart",this.boundOnTouchDown),window.addEventListener("touchmove",this.boundOnTouchMove),window.addEventListener("touchend",this.boundOnTouchUp)}destroy(){window.cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.boundOnResize),window.removeEventListener("mousewheel",this.boundOnWheel),window.removeEventListener("wheel",this.boundOnWheel),window.removeEventListener("mousedown",this.boundOnTouchDown),window.removeEventListener("mousemove",this.boundOnTouchMove),window.removeEventListener("mouseup",this.boundOnTouchUp),window.removeEventListener("touchstart",this.boundOnTouchDown),window.removeEventListener("touchmove",this.boundOnTouchMove),window.removeEventListener("touchend",this.boundOnTouchUp),this.renderer&&this.renderer.gl&&this.renderer.gl.canvas.parentNode&&this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)}}function U({items:h,bend:e=3,textColor:t="#ffffff",borderRadius:s=.05,font:i="bold 30px Figtree",scrollSpeed:n=2,scrollEase:a=.05}){const o=u.useRef(null);return u.useEffect(()=>{const r=new L(o.current,{items:h,bend:e,textColor:t,borderRadius:s,font:i,scrollSpeed:n,scrollEase:a});return()=>{r.destroy()}},[h,e,t,s,i,n,a]),b.jsx("div",{className:"circular-gallery",ref:o})}export{U as default};
