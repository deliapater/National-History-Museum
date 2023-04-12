<template>
  <div class="museum-highlight" :class="highlight.theme">
    <!-- Display the available information for the highlight -->

    <div class="museum-highlight__highlight-icon" v-html="highlight.icon"></div>
    <div class="museum-highlight__highlight-image">
      <!-- used picsum.photos API for a layout reference of the highlight cards. Please note that this images my not match with the context of the card -->
      <img
        :alt="highlight.title"
        :src="'https://picsum.photos/360/320/?random&query=' + highlight.title + '&' + UID"
      />
    </div>
    <div class="museum-highlight__highlight-content">
      <p>
        <em>{{ newsDate }}</em>
      </p>
      <h2 class="museum-highlight__highlight-title">{{ highlight.title }}</h2>
      <p class="museum-highlight__highlight-details">
        {{ highlight.description }}
      </p>
   
      <div class="museum-highlight__news-summary" v-if="highlight.news">
        <h3>News</h3>
        <p class="date" v-if="highlight.news.date">
          {{ newsDateTime(highlight.news.date) }}
        </p>
        <p>{{ highlight.news.title }}</p>
      </div>

      <!-- Identify and display any keys that are not standard object keys and determine whether they contain text or a link. -->
      <p v-for="(item, iIdx) in additionalInfo">
        <template v-if="isValidURL(highlight[item])">
          <a :href="highlight[item]" target="_blank" class="museum-highlight__additional-link"
            >Take a {{ item }}</a
          >
        </template>
        <template v-else>
          <span style="font-size: 1.4rem" v-html="formattedInfo(item, highlight)"></span>
        </template>
      </p>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { uniqueId } from 'lodash'

export default {
  name: 'MuseumHighlight',
  props: {
    highlight: {
      type: Object,
      default() {
        return {
          id: null,
          date: new Date(),
          title: 'Placeholder Title',
          description: 'Placeholder Description',
          imageurl: '',
          icon: '',
          theme: ''
        }
      }
    }
  },
  data() {
    return {
      standardKeys: ['id', 'date', 'title', 'description', 'imageurl', 'icon', 'theme', 'news']
    }
  },
  computed: {
    formattedInfo() {
      return (item, highlight) => {
        return `${item}: ${highlight[item]}`
      }
    },
    newsDate() {
      if (!this.highlight.date) return 'HIGHLIGHT'
      return formatDate(this.highlight.date)
    },
    additionalInfo() {
      let hightlightKeys = Object.keys(this.highlight)
      return hightlightKeys.filter((highlight) => !this.standardKeys.includes(highlight))
    },
    UID() {
      //randomises an image from https://picsum.photos.com
      return uniqueId()
    }
  },
  methods: {
    newsDateTime: function (iDate = new Date()) {
      const formatter = new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long'
      })
      return formatter.format(new Date(iDate))
    },
    isValidURL: function (iURL) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
      return urlPattern.test(iURL)
    }
  }
}
</script>
