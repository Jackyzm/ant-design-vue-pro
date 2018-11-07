<script>
import responsive from "./responsive";
const DescriptionList = {
  props: {
    layout: {
      type: String,
      default: "horizontal"
    },
    className: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    col: {
      type: Number,
      default: 3
    },
    gutter: {
      type: Number,
      default: 32
    },
    size: {
      type: String,
      default: ""
    },
    descriptionListStyle: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  computed: {
    clsString() {
      return `descriptionList ${this.layout} ${this.className} ${
        this.size === "small" ? "small" : ""
      } ${this.size === "large" ? "large" : ""}`;
    }
  },
  data() {
    const column = this.col > 4 ? 4 : this.col;
    return {
      column,
      responsive
    };
  },
  render() {
    return (
      <div class={this.clsString} style="descriptionListStyle">
        {this.title && <div class="title">{this.title}</div>}
        <a-row gutter={this.gutter}>
          {this.list.map((item, index) => {
            return (
              <a-col
                class={`description ${this.className}`}
                key={index}
                xs={this.responsive[this.column].xs}
                sm={this.responsive[this.column].sm}
                md={
                  this.responsive[this.column].md ||
                  this.responsive[this.column].sm
                }
              >
                {item.term && <div class="term">{item.term}</div>}
                <div class="detail">{item.text}</div>
              </a-col>
            );
          })}
        </a-row>
      </div>
    );
  }
};
export default DescriptionList;
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
