<template>
  <div>
    <ul class="c">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LoadingPage",
};
</script>

<style lang="scss" scoped>
$colors: #489d8a #324650 #d34b4c #e8a961;
$size: 2em; /*change this to resize*/

@function scale($i) {
  @return 1em * $i;
}

.c {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  width: 5em;
  width: scale(5);
  li {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: center center;
    animation: anim 1s ease-in-out infinite;
    will-change: transform, filter;
    &:nth-child(1) {
      width: scale(1);
      height: scale(1);
      &:after {
        content: "";
        display: block;
        font-size: 25%;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: scale(1) 0 0 rgba(nth($colors, 1), 0.2),
          -(scale(1)) 0 0 rgba(nth($colors, 2), 0.2),
          0 scale(1) 0 rgba(nth($colors, 3), 0.2),
          0 (-(scale(1))) 0 rgba(nth($colors, 4), 0.2);
      }
    }
    &:nth-child(2) {
      animation-delay: 0.1s;
      width: scale(2);
      height: scale(2);
      &:after {
        content: "";
        display: block;
        font-size: 50%;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: scale(1.5) 0 0 rgba(nth($colors, 1), 0.4),
          -(scale(1.5)) 0 0 rgba(nth($colors, 2), 0.4),
          0 scale(1.5) 0 rgba(nth($colors, 3), 0.4),
          0 (-(scale(1.5))) 0 rgba(nth($colors, 4), 0.4);
      }
    }
    &:nth-child(3) {
      animation-delay: 0.15s;
      width: scale(3);
      height: scale(3);
      &:after {
        content: "";
        display: block;
        font-size: 75%;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: scale(2) 0 0 rgba(nth($colors, 1), 0.6),
          -(scale(2)) 0 0 rgba(nth($colors, 2), 0.6),
          0 scale(2) 0 rgba(nth($colors, 3), 0.6),
          0 (-(scale(2))) 0 rgba(nth($colors, 4), 0.6);
      }
    }
    &:nth-child(4) {
      animation-delay: 0.2s;
      width: scale(4);
      height: scale(4);
      &:after {
        content: "";
        display: block;
        font-size: 100%;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: scale(2.5) 0 0 rgba(nth($colors, 1), 0.8),
          -(scale(2.5)) 0 0 rgba(nth($colors, 2), 0.8),
          0 scale(2.5) 0 rgba(nth($colors, 3), 0.8),
          0 (-(scale(2.5))) 0 rgba(nth($colors, 4), 0.8);
      }
    }
    &:nth-child(5) {
      animation-delay: 0.25s;
      width: scale(5);
      height: scale(5);
      &:after {
        content: "";
        display: block;
        font-size: 125%;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: scale(3) 0 0 nth($colors, 1),
          -(scale(3)) 0 0 nth($colors, 2), 0 scale(3) 0 nth($colors, 3),
          0 (-(scale(3))) 0 nth($colors, 4);
      }
    }
  }
}
@keyframes anim {
  50% {
    filter: blur(2px);
  }
  90%,
  100% {
    transform: rotate(1turn);
    filter: blur(0);
  }
}

div{
    position: fixed;
    background: #fcfcfc;
	height: 100vh;
    width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: $size;
}
</style>
