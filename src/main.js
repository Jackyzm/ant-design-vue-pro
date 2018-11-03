import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store';

import 'moment/locale/zh-cn';

import {
    Button,
    Layout,
    Icon,
    Tooltip,
    Dropdown,
    Avatar,
    Spin,
    AutoComplete,
    Input,
    Menu,
    Popover,
    Badge,
    Tabs,
    List,
    Tag,
    Row,
    Col,
    Card,
    DatePicker,
    Radio,
    Table,
    Divider,
    Breadcrumb
} from "ant-design-vue";

const { Content, Header, Footer, Sider } = Layout;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;
const MenuSubMenu = Menu.SubMenu;
const TabsTabPane = Tabs.TabPane;
const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CardGrid = Card.Grid;
const CardMeta = Card.Meta;
const BreadcrumbItem = Breadcrumb.Item;

Vue.config.productionTip = false;

Vue.component(Button.name, Button);
Vue.component(Layout.name, Layout);
Vue.component(Icon.name, Icon);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Avatar.name, Avatar);
Vue.component(Spin.name, Spin);
Vue.component(AutoComplete.name, AutoComplete);
Vue.component(Input.name, Input);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuDivider.name, MenuDivider);
Vue.component(Popover.name, Popover);
Vue.component(Badge.name, Badge);
Vue.component(Tabs.name, Tabs);
Vue.component(TabsTabPane.name, TabsTabPane);
Vue.component(List.name, List);
Vue.component(ListItem.name, ListItem);
Vue.component(ListItemMeta.name, ListItemMeta);
Vue.component(Tag.name, Tag);
Vue.component(MenuSubMenu.name, MenuSubMenu);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Card.name, Card);
Vue.component(CardGrid.name, CardGrid);
Vue.component(CardMeta.name, CardMeta);
Vue.component(DatePicker.name, DatePicker);
Vue.component(RangePicker.name, RangePicker);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Table.name, Table);
Vue.component(Divider.name, Divider);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);



Vue.component(Content.name, Content);
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(Sider.name, Sider);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
