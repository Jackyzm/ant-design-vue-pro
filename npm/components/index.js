import ActiveChart from "./ActiveChart";
import AvatarList from "./AvatarList/index.vue";
import {
    yuan,
    colors,
    Bar,
    Pie,
    MiniPie,
    Gauge,
    Radar,
    MiniBar,
    MiniArea,
    MiniProgress,
    ChartCard,
    Field,
    WaterWave,
    TagCloud,
    TimelineChart
} from "./Charts";
import CountDown from "./CountDown";
import DescriptionList from "./DescriptionList";
import EditableLinkGroup from "./EditableLinkGroup";
import Ellipsis from "./Ellipsis";
import Exception from "./Exception";
import FooterToolbar from "./FooterToolbar";
import GlobalFooter from "./GlobalFooter";
import GlobalHeader from "./GlobalHeader";
import HeaderSearch from "./HeaderSearch";
import NoticeIcon from "./NoticeIcon";
import NumberInfo from "./NumberInfo";
import PageHeader from "./PageHeader";
import Result from "./Result";
import SiderMenu from "./SiderMenu";
import StandardFormRow from "./StandardFormRow";
import StandardTable from "./StandardTable";
import TagSelect from "./TagSelect";
import Trend from "./Trend";

import "moment/locale/zh-cn";

// const components = [
//     ActiveChart,
//     AvatarList,
//     Bar,
//     Pie,
//     MiniPie,
//     Gauge,
//     Radar,
//     MiniBar,
//     MiniArea,
//     MiniProgress,
//     ChartCard,
//     Field,
//     WaterWave,
//     TagCloud,
//     TimelineChart,
//     CountDown,
//     DescriptionList,
//     EditableLinkGroup,
//     Ellipsis,
//     Exception,
//     FooterToolbar,
//     GlobalFooter,
//     GlobalHeader,
//     HeaderSearch,
//     NoticeIcon,
//     NumberInfo,
//     PageHeader,
//     Result,
//     SiderMenu,
//     StandardFormRow,
//     StandardTable,
//     TagSelect,
//     Trend
// ];

// const install = function(Vue) {
//     components.map(component => {
//         Vue.use(component);
//     });
// };

// /* 支持使用标签的方式引入 */
// if (typeof window !== "undefined" && window.Vue) {
//     install(window.Vue);
// }

export {
    ActiveChart,
    AvatarList,
    yuan,
    colors,
    Bar,
    Pie,
    MiniPie,
    Gauge,
    Radar,
    MiniBar,
    MiniArea,
    MiniProgress,
    ChartCard,
    Field,
    WaterWave,
    TagCloud,
    TimelineChart,
    CountDown,
    DescriptionList,
    EditableLinkGroup,
    Ellipsis,
    Exception,
    FooterToolbar,
    GlobalFooter,
    GlobalHeader,
    HeaderSearch,
    NoticeIcon,
    NumberInfo,
    PageHeader,
    Result,
    SiderMenu,
    StandardFormRow,
    StandardTable,
    TagSelect,
    Trend
};
