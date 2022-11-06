<template>
  <div class="wrap">
    <div>
      <h2>진도율</h2>
      <div ref="donut" class="donut" />
    </div>
    <div>
      <h2>평균 성취도</h2>
      <div class="achieve">
        <ul>
          <li>
            <span class="color child" ref="child" />
            <span class="num">{{ childNumber }}<span>%</span></span>
            <span class="txt">자녀</span>
          </li>
          <li>
            <span class="color average" ref="average" />
            <span class="num">{{ avgNumber }}<span>%</span></span>
            <span class="txt">평균</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  props: {
    mainNumber: {
      type: Number,
      default: null
    },
    mainColor: {
      type: String,
      default: null
    },
    childColor: {
      type: String,
      default: null
    },
    childNumber: {
      type: Number,
      default: null
    },
    avgNumber: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  mounted() {
    const size = this.viewMode === 'pc' ? 315 : 260
    const _this = this
    let dataset = { things: [100 - this.mainNumber, this.mainNumber] }
    let width = size
    let height = size
    let radius = Math.min(width, height) / 2
    let color = d3.scale.category20()
    let pie = d3.layout.pie().sort(null)
    let arc = d3.svg
      .arc()
      .innerRadius(radius - 85)
      .outerRadius(radius - 50)
    let svg = d3
      .select(this.$refs.donut)
      .append('svg')
      .attr('width', width)
      .attr('height', size - 50)
      .append('g')
      .attr(
        'transform',
        'translate(' + width / 2.09 + ',' + height / 2.38 + ')'
      )
    let path = svg
      .selectAll('path')
      .data(pie(dataset.things))
      .enter()
      .append('path')
      .attr('fill', function(d, i) {
        return getColors(i)
      })
      .attr('d', arc)
    function getColors(i) {
      let colorArray = ['#ededed', _this.mainColor]
      return colorArray[i]
    }
    svg
      .append('svg:text')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('style', 'font-family:NotoSansKR;Noto Sans KR')
      .attr('font-size', '40')
      .attr('fill', this.mainColor)
      .text(this.mainNumber + '%')
    this.$refs.child.style.backgroundColor = this.childColor
    this.$refs.child.style.height = this.childNumber * 10 + '%'
    this.$refs.average.style.height = this.avgNumber * 10 + '%'
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: table;
  width: 100%;
  text-align: center;
  & > div {
    display: table-cell;
    width: 50%;
    vertical-align: top;
    h2 {
      display: inline-block;
      width: auto;
      height: 2.4rem;
      padding: 0 1.6rem;
      margin: 0 auto;
      background: #eee;
      border-radius: 2rem;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2.4rem;
    }
    &:last-child {
      h2 {
        margin-left: -2rem;
      }
    }
    .donut {
      width: 315px;
      margin: 0 auto;
    }
    .achieve {
      position: relative;
      width: 12.7rem;
      height: 10.2rem;
      background: url('~static/images/common/bg_achieve.png');
      background-size: 100%;
      border-bottom: 0.2rem solid #dedede;
      // margin: 1rem 0 2.8rem -3rem;
      li {
        position: absolute;
        top: 0;
        width: 50%;
        height: 10rem;
        &:first-child {
          left: 0;
        }
        &:last-child {
          right: 0;
        }
        .color {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 1.5rem;
          height: 10rem;
          width: 3.3rem;
          // padding-top: 6%;
          color: #494078;
          z-index: 1;
          &.average {
            background: #c9c9c9;
          }
        }
        .num {
          position: absolute;
          top: 0.5rem;
          display: block;
          width: 100%;
          padding-left: 1.2rem;
          text-align: center;
          z-index: 2;
          span {
            display: inline-block;
            padding-left: 0.2rem;
            font-size: 1rem;
          }
        }
        .txt {
          display: block;
          padding-top: 10.6rem;
          color: #494078;
        }
      }
    }
  }
}
.study-wrap.pc {
  .achieve {
    margin: 1rem 0 2.8rem 2rem;
  }
}
.study-wrap.mo {
  .achieve {
    margin: 3rem 0 0 -3rem;
  }
}
</style>
