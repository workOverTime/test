<template>
    <div class="hello">
        <h4>贝尔宾团队领导问卷</h4>
        <p>共七个问题共70分,每个问题分8个选项,每个选项给自己打分(可打0分或10分),单问题下选项总分不可超过10分.</p>
        <div
            v-for="(item,i) in arr"
            :key="i"
        >
            <div>{{i+1}}-{{item.title}}</div>
            <div
                class="question"
                v-for="(q,idx) in item.question"
                :key="i+idx+''"
            >
                <el-input
                    style="width:80px"
                    @change="changeCount(q,item)"
                    size="mini"
                    :min="0"
                    type='number'
                    :controls="false"
                    v-model="q.count"
                ></el-input>
                {{q.fakeChar}}_{{q.text}}
            </div>
        </div>
        <div style="text-align:center">
            <el-button
                @click="submit"
                type="primary"
                size="mini"
            >提交</el-button>
        </div>
        <el-dialog
            :fullscreen="true"
            title="测试结果"
            v-model="dialogTableVisible"
        >

            <el-table :data="resData">
                <el-table-column
                    property="A"
                    label="执行者IMP"
                ></el-table-column>
                <el-table-column
                    property="B"
                    label="协调者CO"
                ></el-table-column>
                <el-table-column
                    property="C"
                    label="鞭策者SH"
                ></el-table-column>
                <el-table-column
                    property="D"
                    label="智多星PL"
                ></el-table-column>
                <el-table-column
                    property="E"
                    label="外交官RI"
                ></el-table-column>
                <el-table-column
                    property="F"
                    label="审议员ME"
                ></el-table-column>
                <el-table-column
                    property="G"
                    label="凝聚者TW"
                ></el-table-column>
                <el-table-column
                    property="H"
                    label="完成者CF"
                ></el-table-column>
            </el-table>
            <div>
                <div
                    v-for="item in targetList"
                    :key="item.realChar"
                >
                    <div class="listTitle">{{item.desc.role}}</div>
                    <div class="listRow">典型特征:{{item.desc.trait}}</div>
                    <div class="listRow">积极特性:{{item.desc.merit}}</div>
                    <div class="listRow">能容忍的弱点:{{item.desc.defect}}</div>
                    <div
                        v-for="(i,idx) in item.desc.effect"
                        :key="idx"
                        style="padding-left:20px"
                    >
                        ·{{i}}
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { reactive, ref, defineComponent, getCurrentInstance } from "vue";
var _this: any;
export default defineComponent({
    name: "HelloWorld",
    props: {
        msg: String,
    },
    mounted() {
        const instance: any = getCurrentInstance();
        _this = instance.appContext.config.globalProperties;
    },
    data() {
        return {};
    },
    methods: {},
    setup() {
        let descList: any = reactive({
            A: {
                role: "执行者",
                realChar: "A",
                trait: "保守,顺从,务实可靠",
                merit: "有组织能力,实践经验,工作勤奋,有自我约束力",
                defect: "缺乏灵活性,对没有把握的主意不感兴趣",
                effect: [
                    "把谈话与建议转换为实际步骤",
                    "考虑什么的行得通的什么是行不通的",
                    "整理建议,使之与已经取得一致意见的计划和已有的系统相配合",
                ],
            },
            B: {
                role: "协调者",
                realChar: "B",
                trait: "沉着,自信,有控制局面的能力",
                merit: "对各种有价值的意见不带偏见地兼容并蓄,看问题比较客观",
                defect: "在智能及创造力方面并非超常",
                effect: [
                    "明确团队的目标和方向",
                    "选择需要决策的问题,并明确他们的先后顺序",
                    "帮助确定团队中的角色分工,责任和工作界限",
                    "总结团队的感受和成就,综合团队的建议",
                ],
            },
            C: {
                role: "鞭策者",

                realChar: "C",
                trait: "思维敏捷,开朗,主动探索",
                merit: "有干劲,随时准备向传统,低效率,自满自足挑战",
                defect: "好激起争端,爱冲动,易急躁",
                effect: [
                    "寻找和发现团队讨论中可能的方案",
                    "使团队内的任务和目标成型",
                    "推动团队达成一致意见,并朝向决策行动",
                ],
            },
            D: {
                role: "智多星",

                realChar: "D",
                trait: "有个性,思想深刻,不拘一格",
                merit: "才华横溢,富有想象力,智慧,知识面广",
                defect: "高高在上,不重细节,不拘礼仪",
                effect: [
                    "提供建议",
                    "提出批评并有助于引出相反意见",
                    "对已经形成的行动方案提出新的看法",
                ],
            },
            E: {
                role: "外交家",

                realChar: "E",
                trait: "性格外向,热情,好奇,联系广泛,消息灵通",
                merit: "有广泛联系人的能力,不断探索新的事物,勇于迎接新的挑战",
                defect: "事过境迁,兴趣马上转移",
                effect: [
                    "提出建议,并引入外部信息",
                    "接触持有其他观点的个体或群体",
                    "参加磋商性质的活动",
                ],
            },
            F: {
                role: "审议员",

                realChar: "F",
                trait: "清醒,理智,谨慎",
                merit: "判断力强,分辨力强,讲求实际",
                defect: "缺乏鼓动和激发他人的能力,自己也不容易被别人鼓动和激发",
                effect: [
                    "分析问题和情景",
                    "对繁杂的材料予以简化,并澄清模糊不清的问题",
                    "对他人的判断和作用做出评价",
                ],
            },
            G: {
                role: "凝聚者",

                realChar: "G",
                trait: "擅长人际交往,温和,敏感",
                merit: "有适应周围环境以及人的能力,能促进团队的合作",
                defect: "在危急时刻往往优柔寡断",
                effect: [
                    "给予他人支持,并帮助别人",
                    "打破讨论中的沉默",
                    "采取行动扭转或克服团队中的分歧",
                ],
            },
            H: {
                role: "完成者",

                realChar: "H",
                trait: "勤奋有序,认真,有紧迫感",
                merit: "理想主义者,追求完美,持之以恒",
                defect: "常常拘泥于细节,容易焦虑,不洒脱",
                effect: [
                    "强调任务的目标要求和活动日程表",
                    "在方案中寻找并指出错误,遗憾和被忽视的内容",
                    "刺激其他人参加活动,并促使团队成员产生时间紧迫的感觉",
                ],
            },
            SP: {
                role: "专业师",
                realChar: "SP",
                trait: "专心致志,主动自觉,全情投入",
                merit: "能够提供不易掌握的专业知识和技能",
                defect: "只能在有限范围内作出贡献,沉迷于个人专门兴趣",
                effect: [],
            },
        });
        interface type {
            question: any;
            title: string;
        }
        let arr: type[] = reactive([
            {
                title: "我认为我能为团队做出贡献的是:",
                question: reactive([
                    {
                        count: "0",
                        text: "我能很快的发现并把握新机遇",
                        fakeChar: "A",
                        realChar: "G",
                    },
                    {
                        count: "0",
                        text: "我能与各种类型的人一起合作共事",
                        fakeChar: "B",
                        realChar: "D",
                    },
                    {
                        count: "0",
                        text: "我生来就爱出主意",
                        fakeChar: "C",
                        realChar: "F",
                    },
                    {
                        count: "0",
                        text: "我的能力在于,一旦发现某些实现集体目标很有价值的人,我就及时的把他们推荐出来",
                        fakeChar: "D",
                        realChar: "C",
                    },
                    {
                        count: "0",
                        text: "我能把事情办成,这主要靠我个人的实力",
                        fakeChar: "E",
                        realChar: "A",
                    },
                    {
                        count: "0",
                        text: "如果最终能导致有益的结果,我愿意面对暂时的冷遇",
                        fakeChar: "F",
                        realChar: "H",
                    },
                    {
                        count: "0",
                        text: "我通常能意识到什么是现实的,什么是可能的",
                        fakeChar: "G",
                        realChar: "B",
                    },
                    {
                        count: "0",
                        text: "在选择行动方案时,我能不带倾向性,也不带偏见地提出一个合理的替代方案",
                        fakeChar: "H",
                        realChar: "E",
                    },
                ]),
            },
            {
                title: "在团队中我可能有的弱点是:",
                question: reactive([
                    {
                        count: "0",
                        text: "如果会议没有得到很好的组织,控制和主持,我会感到很不愉快",
                        fakeChar: "A",
                        realChar: "A",
                    },
                    {
                        count: "0",
                        text: "我容易对那些有高见而又没有适当地发表出来的人表现得过于宽容",
                        fakeChar: "B",
                        realChar: "B",
                    },
                    {
                        count: "0",
                        text: "只要集体在讨论新的观点,我总是说的太多",
                        fakeChar: "C",
                        realChar: "E",
                    },
                    {
                        count: "0",
                        text: "我的客观想法,使我很难与同事们打出一片",
                        fakeChar: "D",
                        realChar: "G",
                    },
                    {
                        count: "0",
                        text: "在一定要把事情办成的情况下,我有时使人感到特别强硬以至专断",
                        fakeChar: "E",
                        realChar: "C",
                    },
                    {
                        count: "0",
                        text: "可能由于我过分的重视集体的气氛,我发现自己很难与众不同",
                        fakeChar: "F",
                        realChar: "D",
                    },
                    {
                        count: "0",
                        text: "我易于陷入突发的想象中,而忘了正在进行的事情",
                        fakeChar: "G",
                        realChar: "F",
                    },
                    {
                        count: "0",
                        text: "我成同事认为我过分注意细节,总有不必要的担心,怕把事情搞糟",
                        fakeChar: "H",
                        realChar: "H",
                    },
                ]),
            },
            {
                title: "当我与其他人进行一项工作时:",
                question: reactive([
                    {
                        count: "0",
                        text: "我有在不施加任何压力的情况下,去影响其他人的能力",
                        fakeChar: "A",
                        realChar: "H",
                    },
                    {
                        count: "0",
                        text: "我随时注意防止粗心和工作中的疏忽",
                        fakeChar: "B",
                        realChar: "A",
                    },
                    {
                        count: "0",
                        text: "我愿意施加压力以换取行动,确保会议不是在浪费时间或离题太远",
                        fakeChar: "C",
                        realChar: "C",
                    },
                    {
                        count: "0",
                        text: "在提出独到见解方面,我是独一无二的",
                        fakeChar: "D",
                        realChar: "D",
                    },
                    {
                        count: "0",
                        text: "对于与大家共同利益有关的积极建议我总是乐于支持的",
                        fakeChar: "E",
                        realChar: "F",
                    },
                    {
                        count: "0",
                        text: "我热衷寻求最新的思想和最新的发展",
                        fakeChar: "F",
                        realChar: "G",
                    },
                    {
                        count: "0",
                        text: "我相信我的判断能力有助于做出正确的决策",
                        fakeChar: "G",
                        realChar: "E",
                    },
                    {
                        count: "0",
                        text: "我能使人放心的是,对那些最基本的工作,我都能组织的井井有条",
                        fakeChar: "H",
                        realChar: "B",
                    },
                ]),
            },
            {
                title: "我在工作团队中的特征是:",
                question: reactive([
                    {
                        count: "0",
                        text: "我有兴趣更多的了解我的同事",
                        fakeChar: "A",
                        realChar: "D",
                    },
                    {
                        count: "0",
                        text: "我经常向别人的见解进行挑战或坚持自己的意见",
                        fakeChar: "B",
                        realChar: "H",
                    },
                    {
                        count: "0",
                        text: "在辩论中,我通常能找到论据去推翻那些不甚有理的主张",
                        fakeChar: "C",
                        realChar: "B",
                    },
                    {
                        count: "0",
                        text: "我认为,只要计划必须开始执行,我有推动工作运转的才能",
                        fakeChar: "D",
                        realChar: "E",
                    },
                    {
                        count: "0",
                        text: "我有意避免使自己太突出或出人意料",
                        fakeChar: "E",
                        realChar: "G",
                    },
                    {
                        count: "0",
                        text: "对承担的任何工作,我都能做到尽善尽美",
                        fakeChar: "F",
                        realChar: "C",
                    },
                    {
                        count: "0",
                        text: "我乐于与工作团队以外的人进行联系",
                        fakeChar: "G",
                        realChar: "A",
                    },
                    {
                        count: "0",
                        text: "尽管我对所有的观点都感兴趣,但这并不影响我在必要的时候下决心",
                        fakeChar: "H",
                        realChar: "F",
                    },
                ]),
            },
            {
                title: "在工作中我得到满足,因为:",
                question: [
                    {
                        count: "0",
                        text: "我喜欢分析情况,权衡所有可能的选择",
                        fakeChar: "A",
                        realChar: "B",
                    },
                    {
                        count: "0",
                        text: "我对寻找解决问题的可行方案感兴趣",
                        fakeChar: "B",
                        realChar: "F",
                    },
                    {
                        count: "0",
                        text: "我感到,我在促进良好的工作关系",
                        fakeChar: "C",
                        realChar: "D",
                    },
                    {
                        count: "0",
                        text: "我能对决策有强烈的影响",
                        fakeChar: "D",
                        realChar: "H",
                    },
                    {
                        count: "0",
                        text: "我能适应那些有新意的人",
                        fakeChar: "E",
                        realChar: "E",
                    },
                    {
                        count: "0",
                        text: "我能使人们在某项必要的行动上达成一致意见",
                        fakeChar: "F",
                        realChar: "A",
                    },
                    {
                        count: "0",
                        text: "我感到我的身上有一种能使我全身心地投入到工作中去的气质",
                        fakeChar: "G",
                        realChar: "C",
                    },
                    {
                        count: "0",
                        text: "我很高兴能找到一块可以发挥我想象力的天地",
                        fakeChar: "H",
                        realChar: "G",
                    },
                ],
            },
            {
                title: "如果突然给我一件困难的工作,而且时间有限,人员不熟:",
                question: [
                    {
                        count: "0",
                        text: "在有新方案之前,我宁愿先躲进角落,拟定出一个解脱困境的方案",
                        fakeChar: "A",
                        realChar: "F",
                    },
                    {
                        count: "0",
                        text: "我比较愿意与那些表现出积极态度的人一道工作",
                        fakeChar: "B",
                        realChar: "C",
                    },
                    {
                        count: "0",
                        text: "我会设想通过用人所长的方法来减轻工作负担",
                        fakeChar: "C",
                        realChar: "G",
                    },
                    {
                        count: "0",
                        text: "我天生的紧迫感,将有助于我们不落后在计划后面",
                        fakeChar: "D",
                        realChar: "A",
                    },
                    {
                        count: "0",
                        text: "我认为我能保持头脑冷静,富有调理的思考问题",
                        fakeChar: "E",
                        realChar: "H",
                    },
                    {
                        count: "0",
                        text: "尽管困难重重,我也能保证目标始终如一",
                        fakeChar: "F",
                        realChar: "E",
                    },
                    {
                        count: "0",
                        text: "如果集体工作没有进展,我会采取积极措施去加以推动",
                        fakeChar: "G",
                        realChar: "B",
                    },
                    {
                        count: "0",
                        text: "我愿意展开广泛的讨论意在激发新思想,推动工作",
                        fakeChar: "H",
                        realChar: "D",
                    },
                ],
            },
            {
                title: "对于那些在团队工作中或与周围人共事所遇到的问题:",
                question: reactive([
                    {
                        count: "0",
                        text: "我很容易对那些阻碍前进的人表现得不耐烦",
                        fakeChar: "A",
                        realChar: "E",
                    },
                    {
                        count: "0",
                        text: "别人可能批评我太重分析而缺少直觉",
                        fakeChar: "B",
                        realChar: "G",
                    },
                    {
                        count: "0",
                        text: "我有做好工作的愿望,能确保工作的持续进展",
                        fakeChar: "C",
                        realChar: "A",
                    },
                    {
                        count: "0",
                        text: "我常常容易产生厌烦感,需要一,两个有激情的人使我振作起来",
                        fakeChar: "D",
                        realChar: "F",
                    },
                    {
                        count: "0",
                        text: "如果目标不明确,让我起步是很困难的",
                        fakeChar: "E",
                        realChar: "D",
                    },
                    {
                        count: "0",
                        text: "对于我遇到的复杂问题,我有时不善于加以解释和澄清",
                        fakeChar: "F",
                        realChar: "B",
                    },
                    {
                        count: "0",
                        text: "对于那些我不能做的事,我有意识地求助他人",
                        fakeChar: "G",
                        realChar: "H",
                    },
                    {
                        count: "0",
                        text: "当我与真正的对立面发生冲突时,我没有把握使对方理解我的观点",
                        fakeChar: "H",
                        realChar: "C",
                    },
                ]),
            },
        ]);
        let changeCount = (q: any, item: any) => {
            q.count = Number(q.count) + "";
            if (isNaN(Number(q.count)) || q.count < 0) {
                q.count = "0";
                _this.$message.warning("请输入0~10的数字");
            }
            let sum: number = 0;
            item.question.forEach((i: any) => {
                sum += Number(i.count);
            });
            if (sum > 10) {
                let idx: number = arr.findIndex((i) => i.title === item.title);
                q.count = "0";
                if (idx >= 0) {
                    _this.$message.warning(
                        "第" +
                            (idx + 1) +
                            "个问题下分值总和已超过10,请修改重新填写当前分数"
                    );
                }
            }
        };
        let resData: any = ref([]);
        let dialogTableVisible: any = ref(false);
        let targetList: any = ref([]);
        let submit = () => {
            let totalsum: number = 0;
            arr.forEach((lv1) => {
                lv1.question.forEach((lv2: any) => {
                    totalsum += Number(lv2.count);
                });
            });
            console.log(totalsum);
            if (totalsum < 70) {
                _this.$message.warning("总分未达到70,请检查分数");
                return;
            }

            function getChar(obj: any, item: any) {
                obj[item.realChar] += Number(item.count);
                return obj;
            }
            let res = arr.reduce(
                (res: any, item: any) => {
                    let obj = item.question.reduce(getChar, {
                        A: 0,
                        B: 0,
                        C: 0,
                        D: 0,
                        E: 0,
                        F: 0,
                        G: 0,
                        H: 0,
                    });
                    console.log(obj);
                    for (let key in obj) {
                        res[key] += Number(obj[key]);
                    }
                    return res;
                },
                { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 }
            );
            resData.value = [res];
            let totalList = [];
            for (let k in res) {
                totalList.push({
                    name: k,
                    value: res[k],
                    desc: descList[k],
                });
            }
            let t = totalList.filter((i) => i.value >= 10);
            if (t.length > 0) {
                targetList.value = t;
            } else {
                targetList.value = [
                    {
                        name: "专业师",
                        value: "",
                        desc: descList["SP"],
                    },
                ];
            }
            dialogTableVisible.value = true;
        };

        return {
            dialogTableVisible,
            arr,
            resData,
            targetList,
            changeCount,
            submit,
            descList,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
    -webkit-appearance: none !important
    margin: 0
</style>
<style scoped lang="sass">
h3
    margin: 40px 0 0

ul
    list-style-type: none
    padding: 0

li
    display: inline-block
    margin: 0 10px

a
    color: #42b983

.hello
    text-align: left
    padding: 20px
    .question
        padding-left: 20px
.listRow
    padding: 5px 0 5px 10px
    color: #333
.listTitle
    font-size: 18px
    font-weight: bold
    margin-top: 10px
</style>
