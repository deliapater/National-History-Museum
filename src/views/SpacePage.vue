<template>
  <div class="space-page">
    <nav class="space-page__navbar">
      <h1><i class="fas fa-globe" style="padding-right: 10px"></i>National History Museum</h1>
      <div class="space-page__navbar__hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
    <h1 class="space-page__title">Space</h1>
    <div class="space-page__highlight-wrapper">
      <!-- Add the museum highlight cards based on the data provided below -->
      <MuseumHighlight
        v-for="(highlight, hIdx) in cHighlightCards"
        :key="'highlight_' + hIdx"
        :highlight="highlight"
      />
    </div>
  </div>
</template>

<script>
import MuseumHighlight from '@/components/MuseumHighlight.vue'

export default {
  name: 'SpacePage',
  components: {
    MuseumHighlight
  },
  data() {
    return {
      spaceHighlights: [
        {
          date: '2020-04-20 12:20:00',
          description:
            'Asteroids are minor planets, especially of the inner Solar System. Larger asteroids have also been called planetoids.',
          id: 1,
          image: '',
          name: 'Asteroids'
        },
        {
          date: '2020-05-20 15:50:00',
          description:
            'A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing.',
          id: 9,
          image: '',
          name: 'Comets'
        },
        {
          date: '2020-05-01 9:22:00',
          description:
            'The term planet is ancient, with ties to history, astrology, science, mythology, and religion.',
          id: 7,
          image: '',
          name: 'Planets',
          news: {
            date: '2020-08-18 18:00:00',
            title: 'Attend our talk about Jupiter with Dr. Hogarth'
          },
          quiz: 'https://planetquiz.space'
        },
        {
          date: '2020-07-05 4:10:00',
          description:
            'A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.',
          id: 12,
          image: '',
          name: 'Meteor showers',
          news: {
            title: 'The Lyrids will peak at on April 21-22 2021, at night'
          }
        }
      ],
      spacePartners: {
        observatory: {
          createdAt: '2020-06-01 11:45:00',
          info: 'The Mauna Kea Observatories (MKO) are a number of independent astronomical research facilities and large telescope observatories that are located at the summit of Mauna Kea on the Big Island of Hawaiʻi, United States.',
          image: '',
          name: 'Mauna Kea Observatories'
        }
      },
      // Thank you card
      fixedHighlight: {
        title: 'Thanks for reviewing this code!!',
        imageurl: '',
        icon: '<i class="fas fa-smile"></i>',
        Name: 'Delia Paternina',
        Location: 'Glasgow, UK',
        theme: 'fixed'
      }
    }
  },
  computed: {
    cHighlightCards() {
      let allHighlights = [...this.cSpaceHighlights, ...this.cSpacePartners, this.fixedHighlight]

      allHighlights.sort((a, b) => new Date(b.date) - new Date(a.date))

      return allHighlights
    },
    cSpaceHighlights() {
      return this.spaceHighlights.reduce((highlights, highlight) => {
        const highlightObj = {
          id: highlight.id,
          date: highlight.date,
          title: highlight.name,
          description: highlight.description,
          imageurl: highlight.image,
          icon: '<i class="fas fa-star"></i>',
          news: highlight.news,
          theme: 'space'
        }

        if (highlight.quiz) highlightObj.quiz = highlight.quiz

        return [...highlights, highlightObj]
      }, [])
    },
    cSpacePartners() {
      // Assuming that the response object could have multiple objects
      return Object.values(this.spacePartners).map((partner) => ({
        id: null,
        date: partner.createdAt,
        title: partner.name,
        description: partner.info,
        imageurl: partner.image,
        icon: '<i class="fas fa-globe"></i>',
        theme: 'partner'
      }))
    }
  },
  methods: {},
  created() {
    //
    // abstract example of highlight data retrieval
    //
    // Promise.all([fetch(url1), fetch(url2), fetch(url3)])
    //   .then((responses) => Promise.all(responses.map((response) => response.json())))
    //   .then((results) => {
    //     this.spaceHighlights = results[0]
    //     this.spacePartners = results[1]
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }
}
</script>
