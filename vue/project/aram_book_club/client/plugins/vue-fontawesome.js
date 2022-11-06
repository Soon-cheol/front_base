import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft,
  faChevronRight,
  faCoins,
  faPlus,
  faCircle,
  faPlay,
  faShoppingCart,
  faMoneyCheck,
  faCalendarAlt,
  faSearch,
  faEnvelope,
  faKey,
  faUsers,
  faFolderOpen,
  faCheckCircle,
  faHome
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faChevronLeft,
  faChevronRight,
  faCoins,
  faPlus,
  faCircle,
  faPlay,
  faShoppingCart,
  faMoneyCheck,
  faCalendarAlt,
  faSearch,
  faEnvelope,
  faKey,
  faUsers,
  faFolderOpen,
  faCheckCircle,
  faHome
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
