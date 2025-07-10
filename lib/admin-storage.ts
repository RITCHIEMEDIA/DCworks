// Admin panel data management using localStorage
export interface AdminData {
  pastors: Pastor[]
  worshipLeaders: WorshipLeader[]
  youthPastors: YouthPastor[]
  weeklyActivities: WeeklyActivity[]
  events: Event[]
  sermons: Sermon[]
  blogPosts: BlogPost[]
  testimonials: Testimonial[]
}

export interface Pastor {
  id: string
  name: string
  title: string
  bio: string
  image: string
  email: string
  phone: string
}

export interface WorshipLeader {
  id: string
  name: string
  role: string
  bio: string
  image: string
  instruments: string[]
}

export interface YouthPastor {
  id: string
  name: string
  title: string
  bio: string
  image: string
  email: string
  phone: string
  ageGroup: string
}

export interface WeeklyActivity {
  id: string
  title: string
  description: string
  day: string
  time: string
  location: string
  category: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
  featured: boolean
  registrationRequired: boolean
  maxAttendees?: number
  currentAttendees: number
}

export interface Sermon {
  id: string
  title: string
  speaker: string
  date: string
  series: string
  duration: string
  description: string
  audioUrl?: string
  videoUrl?: string
  image: string
  views: number
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  featured: boolean
  tags: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image: string
  featured: boolean
}

class AdminStorage {
  private storageKey = "dominion-city-admin-data"

  private getDefaultData(): AdminData {
    return {
      pastors: [
        {
          id: "1",
          name: "Pastor John Adebayo",
          title: "Senior Pastor & Founder",
          bio: "Pastor John has been leading Dominion City since its inception. With over 20 years of ministry experience, he is passionate about developing leaders and building strong communities.",
          image: "/placeholder.svg?height=300&width=300",
          email: "pastor@dominioncity.org",
          phone: "+234 803 123 4567",
        },
      ],
      worshipLeaders: [
        {
          id: "1",
          name: "Michael Thompson",
          role: "Worship Leader",
          bio: "Leading our congregation in meaningful worship through music and arts.",
          image: "/placeholder.svg?height=300&width=300",
          instruments: ["Piano", "Guitar", "Vocals"],
        },
      ],
      youthPastors: [
        {
          id: "1",
          name: "Pastor David Okafor",
          title: "Youth & Young Adults Pastor",
          bio: "Pastor David leads our vibrant youth and young adults ministry. He is passionate about mentoring the next generation.",
          image: "/placeholder.svg?height=300&width=300",
          email: "youth@dominioncity.org",
          phone: "+234 803 123 4568",
          ageGroup: "13-35",
        },
      ],
      weeklyActivities: [
        {
          id: "1",
          title: "Sunday Worship Service",
          description: "Main worship service with contemporary music and biblical teaching",
          day: "Sunday",
          time: "10:30 AM",
          location: "Main Auditorium",
          category: "Worship",
        },
        {
          id: "2",
          title: "Wednesday Bible Study",
          description: "Mid-week Bible study and prayer meeting",
          day: "Wednesday",
          time: "7:00 PM",
          location: "Fellowship Hall",
          category: "Bible Study",
        },
      ],
      events: [],
      sermons: [],
      blogPosts: [],
      testimonials: [],
    }
  }

  getData(): AdminData {
    if (typeof window === "undefined") return this.getDefaultData()

    const stored = localStorage.getItem(this.storageKey)
    if (!stored) {
      const defaultData = this.getDefaultData()
      this.saveData(defaultData)
      return defaultData
    }

    try {
      return JSON.parse(stored)
    } catch {
      return this.getDefaultData()
    }
  }

  saveData(data: AdminData): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  updatePastors(pastors: Pastor[]): void {
    const data = this.getData()
    data.pastors = pastors
    this.saveData(data)
  }

  updateWorshipLeaders(worshipLeaders: WorshipLeader[]): void {
    const data = this.getData()
    data.worshipLeaders = worshipLeaders
    this.saveData(data)
  }

  updateYouthPastors(youthPastors: YouthPastor[]): void {
    const data = this.getData()
    data.youthPastors = youthPastors
    this.saveData(data)
  }

  updateWeeklyActivities(activities: WeeklyActivity[]): void {
    const data = this.getData()
    data.weeklyActivities = activities
    this.saveData(data)
  }

  addBlogPost(post: BlogPost): void {
    const data = this.getData()
    data.blogPosts.unshift(post)
    this.saveData(data)
  }

  updateBlogPost(postId: string, updatedPost: BlogPost): void {
    const data = this.getData()
    const index = data.blogPosts.findIndex((post) => post.id === postId)
    if (index !== -1) {
      data.blogPosts[index] = updatedPost
      this.saveData(data)
    }
  }

  deleteBlogPost(postId: string): void {
    const data = this.getData()
    data.blogPosts = data.blogPosts.filter((post) => post.id !== postId)
    this.saveData(data)
  }
}

export const adminStorage = new AdminStorage()
