<template>
    <div class="vue-contributions" :color-mode="theme">
        <svg :width="mW" :height="mH">
            <text
                class="calendar-label"
                :style="{ fontSize: fontSize + 'px' }"
                :x="0"
                :y="getWeekY(i)"
                v-for="(w, i) in week"
            >
                {{ w }}
            </text>
            <template v-for="(item, index) in getDays" :key="item.date">
                <g>
                    <rect
                        class="calendar-day"
                        rx="2"
                        ry="2"
                        :data-date="item.date"
                        :data-level="setLevel(item.date)"
                        :width="rectWidth"
                        :height="rectHeight"
                        @click="click(item)"
                        :x="rectX(index)"
                        :y="rectY(index)"
                        @mouseenter="mouseenter($event, item)"
                        @mouseleave="mouseleave"
                    ></rect>
                    <text
                        class="calendar-month calendar-label"
                        :style="{ fontSize: fontSize + 'px' }"
                        v-if="getMonth(item)"
                        :x="rectX(index)"
                        :y="10"
                    >
                        {{ getMonth(item) }}
                    </text>
                </g>
            </template>
        </svg>
        <div
            ref="tipText"
            :style="{ left: tipX, top: tipY }"
            v-if="tipText"
            class="svg-tip"
        >
            <i></i>
            <div v-html="tipText"></div>
        </div>
        <div class="bottom">
            <span class="calendar-label">Less</span>
            <svg :width="rectWidth * 6 + 3" :height="rectHeight">
                <template v-for="index in 5">
                    <g>
                        <rect
                            class="calendar-day"
                            rx="2"
                            ry="2"
                            :data-level="index"
                            :width="rectWidth"
                            :height="rectHeight"
                            :x="index * rectWidth + index * 3"
                            :y="0"
                        ></rect>
                    </g>
                </template>
            </svg>
            <span class="calendar-label">More</span>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue'
import { monthText, formatP, weekText } from '@/utils/date'
const WEEK_PADDING = 20
const PADDING_TOP = 20
export default defineComponent({
    name: 'VueContributions',
    components: {},
    data() {
        return {
            tipText: '',
            tipX: '',
            tipY: '',
        }
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        theme: {
            type: String,
            default: 'light',
        },
        year: {
            type: Number,
        },
        fontSize: {
            type: Number,
            default: () => {
                return 9
            },
        },
        spacing: {
            type: Number,
            default: () => {
                return 3
            },
        },
        rectWidth: {
            type: Number,
            default: () => {
                return 12
            },
        },
        rectHeight: {
            type: Number,
            default: () => {
                return 12
            },
        },
        language: {
            type: String,
            default: 'en',
        },
        click: {
            type: Function,
            default: () => ({}),
        },
    },
    computed: {
        mW: function () {
            return (this.rectWidth + this.spacing) * 53 + WEEK_PADDING
        },
        mH: function () {
            return (this.rectHeight + this.spacing) * 7 + 20
        },
        month: function () {
            return monthText[this.language]
        },
        week: function () {
            return weekText[this.language]
        },
        getDays() {
            let lastDay: any = new Date()
            let date: any = new Date()
            let lastYear = date.setFullYear(date.getFullYear() - 1)
            if (this.year) {
                lastDay = new Date(this.year + '-12-31')
                lastYear = new Date(this.year + '-01-01')
            }
            const days: any = []
            while (lastDay >= lastYear) {
                days.unshift({
                    date: formatP(lastDay),
                    month: lastDay.getMonth() + 1,
                    day: lastDay.getDate(),
                })
                lastDay.setDate(lastDay.getDate() - 1)
            }
            this.$emit('updateContributions', this.getContributions(days))
            return days
        },
        getFirstWeek() {
            const date: string = this.getDays[0].date
            return new Date(date).getDay()
        },
    },
    methods: {
        getContributions(days = this.getDays) {
            const obj = {}
            days.forEach((data) => {
                if (this.data[data.date]) {
                    if (obj[data.date]) {
                        obj[data.date] += this.data[data.date]
                    } else {
                        obj[data.date] = this.data[data.date]
                    }
                }
            })
            return obj
        },
        mouseenter(e: any, item: any) {
            const v = this.data[item.date] || 0
            const t = v > 0 ? v : 'No'
            const { x, y } = e.target.getBoundingClientRect()
            this.tipText = `${t} contributions on <span style="color:#aaa">
                ${item.date}
                </span>`
            this.$nextTick(() => {
                const tipText = this.$refs.tipText as any
                const w = Number(tipText.offsetWidth)
                const h = Number(tipText.offsetHeight)
                this.tipX = x - (w - this.rectWidth) / 2 - 3 + 'px'
                this.tipY =
                    y -
                    h -
                    this.rectHeight +
                    window.scrollY -
                    this.mH -
                    6 +
                    'px'
            })
        },
        mouseleave() {
            this.tipText = ''
        },
        getMonth(item: any) {
            if (item.day === 1) {
                return monthText[this.language][item.month - 1]
            }
            return false
        },
        getMonthText(date: Date) {
            const dateStr = date.toDateString()
            return dateStr.split(' ')[1]
        },
        getWeekY(i: any) {
            return (this.rectHeight + this.spacing) * i + PADDING_TOP + 9
        },
        setLevel(key: any) {
            const v = this.data[key] || 0
            let level = 0
            if (v <= 10 && v > 0) {
                level = 1
            }
            if (v > 10 && v <= 20) {
                level = 2
            }
            if (v > 20 && v <= 30) {
                level = 3
            }
            if (v > 30) {
                level = 4
            }
            return level
        },
        rectX(index: any) {
            const i = parseInt((index + this.getFirstWeek) / 7)
            return i * (this.rectWidth + this.spacing) + WEEK_PADDING
        },
        rectY(index: any) {
            const i = parseInt((index + this.getFirstWeek) % 7)
            return i * (this.rectHeight + this.spacing) + PADDING_TOP
        },
    },
    mounted() {
        this.$emit('updateContributions', this.getContributions())
    },
})
</script>
<style lang="stylus" scope>
[color-mode="light"]
    --color-text-primary #24292e
    --color-border-primary #e1e4e8
    --color-calendar-graph-day-bg: #ebedf0;
    --color-calendar-graph-day-border: rgba(27,31,35,0.06);
    --color-calendar-graph-day-L1-bg: #9be9a8;
    --color-calendar-graph-day-L2-bg: #40c463;
    --color-calendar-graph-day-L3-bg: #30a14e;
    --color-calendar-graph-day-L4-bg: #216e39;
    --color-calendar-graph-day-L1-border: rgba(27,31,35,0.06);
    --color-calendar-graph-day-L2-border: rgba(27,31,35,0.06);
    --color-calendar-graph-day-L3-border: rgba(27,31,35,0.06);
    --color-calendar-graph-day-L4-border: rgba(27,31,35,0.06);
    --color-bg-canvas #fff

[color-mode="dark"]
    --color-text-primary #c9d1d9
    --color-border-primary #30363d
    --color-scale-gray-8: #161b22;
    --color-calendar-graph-day-bg: var(--color-scale-gray-8);
    --color-calendar-graph-day-border: rgba(27,31,35,0.06);
    --color-calendar-graph-day-L1-bg: #0e4429;
    --color-calendar-graph-day-L2-bg: #006d32;
    --color-calendar-graph-day-L3-bg: #26a641;
    --color-calendar-graph-day-L4-bg: #39d353;
    --color-calendar-graph-day-L1-border: hsla(0,0%,100%,0.05);
    --color-calendar-graph-day-L2-border: hsla(0,0%,100%,0.05);
    --color-calendar-graph-day-L3-border: hsla(0,0%,100%,0.05);
    --color-calendar-graph-day-L4-border: hsla(0,0%,100%,0.05);

    --color-bg-canvas #0d1117


.vue-contributions
    padding 12px 16px
    border: 1px solid var(--color-border-primary)
    border-radius: 6px;
    // max-width 600px
    overflow hidden
    text-align: center
    display:flex
    align-items:flex-end
    flex-direction column
    background-color: var(--color-bg-canvas);
    .bottom
        display:flex
        align-items:center
        margin-top:5px
        span
            transform scale(0.9)
        svg
            margin 0 5px
    .position-relative
        position: relative
    .svg-tip
        position: absolute;
        padding: 10px 15px;
        background-color: rgba(0,0,0,0.9);
        border-radius: 4px;
        color: #fff;
        font-size: 12px;
        z-index: 9999;
        font-weight:bold
        i
            position: absolute;
            width:0;
            height:0;
            border-right:6px solid transparent;
            border-left:6px solid transparent;
            border-top:6px solid #000;
            left: 50%;
            bottom: -6px;
            margin-left: -3px;
    .calendar-label
        fill: var(--color-text-primary);
        color: var(--color-text-primary);
        font-size:9px
    .calendar-day
        fill: var(--color-calendar-graph-day-bg);
        outline: 1px solid var(--color-calendar-graph-day-border);
        outline-offset: -1px;
    [data-level="1"]
        fill: var(--color-calendar-graph-day-L1-bg);
        outline: 1px solid var(--color-calendar-graph-day-L3-border);
    [data-level="2"]
        fill: var(--color-calendar-graph-day-L2-bg);
        outline: 1px solid var(--color-calendar-graph-day-L3-border);
    [data-level="3"]
        fill: var(--color-calendar-graph-day-L3-bg);
        outline: 1px solid var(--color-calendar-graph-day-L3-border);
    [data-level="4"]
        fill: var(--color-calendar-graph-day-L4-bg);
        outline: 1px solid var(--color-calendar-graph-day-L3-border);
</style>
