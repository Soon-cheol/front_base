<template>
  <div class="popup">
    <div class="popup-center">
      <div>
        <!-- <transition name="modal" appear> -->
        <div class="media-container" style="background-color: #aaa;">
          <div class="media-wrapper">
            <center>
              <table>
                <tr>
                  <td width="10%" />
                  <th>
                    {{ PlayTitle }}
                  </th>
                  <td width="10%"><div @click="$emit('close')">[X]</div></td>
                </tr>
              </table>
            </center>
            <video controls width="100%" autoplay>
              <source :src="PlaySrc" type="video/mp4" />
            </video>
          </div>
        </div>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    PlaySrc: {
      type: String,
      default: null
    },
    PlayTitle: {
      type: String,
      default: null
    }
  },
  created() {
    console.log(this.playNum)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
// .modal {
//   &.modal-overlay {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: fixed;
//     z-index: 30;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.5);
//   }
.popup {
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1001;
  .popup-center {
    display: table-cell;
    height: 100%;
    vertical-align: middle;
    .popup-contants {
      position: relative;
      overflow: auto;
      width: 80%;
      height: auto;
      /* min-height: 60%; */
      max-height: 80%;
      margin: 0 auto;
      background: #fff;
      border-radius: 4px;
      h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid #dfdfdf;
        font-size: 16px;
        font-weight: 400;
      }
      .btn-close {
        position: absolute;
        top: 0;
        right: 0.8rem;
        width: 2.4rem;
        height: 3.8rem;
        background: url('~static/svg2/icon_head_x02.svg') no-repeat center
          center;
        background-size: 1.2rem;
      }
    }
  }
}
.media-container {
  display: table;
  position: relative;
  width: 100%;
  height: 100%;
  .media-wrapper {
    display: table-cell;
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}

// 오버레이 트랜지션
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;

  // 오버레이에 포함되어 있는 모달 윈도의 트랜지션
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// 딜레이가 적용된 모달 윈도가 제거된 후에 오버레이가 사라짐
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
